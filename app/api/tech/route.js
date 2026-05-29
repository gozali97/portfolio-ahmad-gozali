import { NextResponse } from 'next/server'
import { getTechStacks, saveTechStack } from '@/lib/data'

export async function GET() {
  return NextResponse.json(getTechStacks())
}

export async function POST(request) {
  const data = await request.json()
  const saved = saveTechStack(data)
  return NextResponse.json(saved)
}
