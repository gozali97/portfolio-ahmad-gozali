import { NextResponse } from 'next/server'
import { saveUpload, UploadError } from '@/lib/storage'

export const runtime = 'nodejs'

export async function POST(request) {
  let form
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = form.get('file')
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const kind = form.get('kind') === 'document' ? 'document' : 'image'

  try {
    return NextResponse.json(await saveUpload(file, { kind }), { status: 201 })
  } catch (err) {
    if (err instanceof UploadError) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    console.error('Upload failed:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
