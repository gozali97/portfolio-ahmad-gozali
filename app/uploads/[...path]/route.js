import path from 'node:path'
import { promises as fs } from 'node:fs'
import { resolveUploadPath, MIME_TYPES } from '@/lib/storage'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_request, { params }) {
  const { path: segments } = await params
  const filePath = resolveUploadPath(segments || [])
  if (!filePath) return new Response('Not found', { status: 404 })

  let data
  try {
    const stat = await fs.stat(filePath)
    if (!stat.isFile()) return new Response('Not found', { status: 404 })
    data = await fs.readFile(filePath)
  } catch {
    return new Response('Not found', { status: 404 })
  }

  const ext = path.extname(filePath).toLowerCase()
  const headers = {
    'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
    'Content-Length': String(data.length),
    // Filenames are unique per upload, so they can be cached forever.
    'Cache-Control': 'public, max-age=31536000, immutable',
    'X-Content-Type-Options': 'nosniff',
  }
  if (ext === '.svg') headers['Content-Security-Policy'] = "default-src 'none'; style-src 'unsafe-inline'"
  if (ext === '.pdf') headers['Content-Disposition'] = `inline; filename="${path.basename(filePath)}"`

  return new Response(data, { headers })
}
