import { NextResponse } from 'next/server'
import { saveTechStack, deleteTechStack, getTechStacks } from '@/lib/data'

export async function GET(request, { params }) {
  const { id } = await params
  const stacks = getTechStacks()
  const tech = stacks.find((t) => t.id === Number(id))
  if (!tech) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(tech)
}

export async function PUT(request, { params }) {
  const { id } = await params
  const data = await request.json()
  data.id = Number(id)
  const updated = saveTechStack(data)
  return NextResponse.json(updated)
}

export async function DELETE(request, { params }) {
  const { id } = await params
  deleteTechStack(id)
  return NextResponse.json({ success: true })
}
