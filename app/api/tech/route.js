import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getTechStacks, saveTechStack } from '@/lib/data'

export async function GET() {
  return NextResponse.json(await getTechStacks())
}

export async function POST(request) {
  const data = await request.json()
  delete data.id
  const saved = await saveTechStack(data)
  revalidatePath('/')
  return NextResponse.json(saved)
}
