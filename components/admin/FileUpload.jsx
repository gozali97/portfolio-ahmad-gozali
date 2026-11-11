'use client'

import { useRef, useState } from 'react'
import { Upload, Loader2, FileText, X } from 'lucide-react'

/**
 * URL input with an upload button. Uploaded files are stored on the server
 * and the resulting URL is passed to onChange.
 */
export default function FileUpload({ label, value, onChange, kind = 'image', placeholder, preview = 'square' }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const accept = kind === 'document' ? 'application/pdf,.pdf' : 'image/*'

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setUploading(true)
    setError('')
    try {
      const body = new FormData()
      body.append('file', file)
      body.append('kind', kind)
      const res = await fetch('/api/upload', { method: 'POST', body })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || `Upload failed (${res.status})`)
      onChange(data.url)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
      <div className="flex gap-2">
        <input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex shrink-0 items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
        <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
      </div>

      {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {value && !error && (
        <div className="mt-2 flex items-center gap-3">
          {kind === 'document' ? (
            <a href={value} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-cyan-600 dark:text-cyan-400 hover:underline">
              <FileText size={16} /> Open file
            </a>
          ) : (
            <img
              src={value}
              alt="Preview"
              className={`h-16 w-16 border object-cover ${preview === 'round' ? 'rounded-full' : 'rounded-lg'}`}
            />
          )}
          <button type="button" onClick={() => onChange('')} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500">
            <X size={14} /> Clear
          </button>
        </div>
      )}
    </div>
  )
}
