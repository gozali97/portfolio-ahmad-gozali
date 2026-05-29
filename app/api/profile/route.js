import { NextResponse } from 'next/server'
import { getProfile, saveProfile } from '@/lib/data'

export async function GET() {
  return NextResponse.json(getProfile())
}

export async function PUT(request) {
  const data = await request.json()
  const updated = saveProfile(data)
  return NextResponse.json(updated)
}
