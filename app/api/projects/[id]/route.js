import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getProjectById, saveProject, deleteProject } from '@/lib/data'

export async function GET(request, { params }) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(request, { params }) {
  const { id } = await params
  const data = await request.json()
  data.id = Number(id)
  const updated = await saveProject(data)
  revalidatePath('/')
  return NextResponse.json(updated)
}

export async function DELETE(request, { params }) {
  const { id } = await params
  await deleteProject(id)
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
