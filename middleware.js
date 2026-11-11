import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/profile(.*)', '/api/projects(.*)', '/api/tech(.*)'])
const isUploadRoute = createRouteMatcher(['/api/upload(.*)'])
const isPublicRoute = createRouteMatcher(['/', '/admin/sign-in(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isUploadRoute(req)) {
    // auth.protect() rewrites to a 404 page, which breaks multipart POSTs (500); answer with JSON instead.
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return
  }
  if (isAdminRoute(req) && !isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|pdf|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
