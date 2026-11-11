import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getTechStackById, saveTechStack, deleteTechStack } from '@/lib/data'

export async function GET(request, { params }) {
  const { id } = await params
  const tech = await getTechStackById(id)
  if (!tech) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(tech)
}

export async function PUT(request, { params }) {
  const { id } = await params
  const data = await request.json()
  data.id = Number(id)
  const updated = await saveTechStack(data)
  revalidatePath('/')
  return NextResponse.json(updated)
}

export async function DELETE(request, { params }) {
  const { id } = await params
  await deleteTechStack(id)
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
