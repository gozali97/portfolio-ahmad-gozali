import { NextResponse } from 'next/server'
import { getProjects, saveProject } from '@/lib/data'

export async function GET() {
  return NextResponse.json(getProjects())
}

export async function POST(request) {
  const data = await request.json()
  const saved = saveProject(data)
  return NextResponse.json(saved)
}
