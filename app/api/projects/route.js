import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getProjects, saveProject } from '@/lib/data'

export async function GET() {
  return NextResponse.json(await getProjects())
}

export async function POST(request) {
  const data = await request.json()
  delete data.id
  const saved = await saveProject(data)
  revalidatePath('/')
  return NextResponse.json(saved)
}
