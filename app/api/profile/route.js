import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getProfile, saveProfile } from '@/lib/data'

export async function GET() {
  return NextResponse.json(await getProfile())
}

export async function PUT(request) {
  const data = await request.json()
  const updated = await saveProfile(data)
  revalidatePath('/')
  return NextResponse.json(updated)
}
