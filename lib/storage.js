import path from 'node:path'
import { promises as fs } from 'node:fs'
import crypto from 'node:crypto'

export const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), 'storage', 'uploads'))
export const UPLOAD_URL_PREFIX = '/uploads'
// Kept below Next's 10 MB middleware request-body buffer limit.
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024

export const MIME_TYPES = {
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

export const ALLOWED = {
  image: ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico'],
  document: ['.pdf'],
}

function slugify(name) {
  return name
    .normalize('NFKD')
    .replace(/[^\w\s.-]/g, '')
    .trim()
    .replace(/[\s.]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
    .slice(0, 60) || 'file'
}

export async function saveUpload(file, { kind = 'image' } = {}) {
  const allowed = ALLOWED[kind] || [...ALLOWED.image, ...ALLOWED.document]
  const ext = path.extname(file.name || '').toLowerCase()
  if (!allowed.includes(ext)) {
    throw new UploadError(`File type ${ext || '(none)'} is not allowed. Allowed: ${allowed.join(', ')}`)
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadError(`File is too large. Max ${MAX_UPLOAD_BYTES / 1024 / 1024} MB`)
  }

  const folder = kind === 'document' ? 'documents' : 'images'
  const base = slugify(path.basename(file.name, ext))
  const filename = `${base}-${Date.now().toString(36)}${crypto.randomBytes(3).toString('hex')}${ext}`
  const dir = path.join(UPLOAD_DIR, folder)

  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()))

  return { url: `${UPLOAD_URL_PREFIX}/${folder}/${filename}`, name: filename, size: file.size }
}

/** Resolves a URL path segment list to an absolute file path inside UPLOAD_DIR, or null if it escapes it. */
export function resolveUploadPath(segments) {
  const target = path.resolve(UPLOAD_DIR, ...segments)
  if (target !== UPLOAD_DIR && !target.startsWith(UPLOAD_DIR + path.sep)) return null
  return target
}

export class UploadError extends Error {}
