import { query } from '@/lib/db'

// ── Helpers ──

const parseJson = (value, fallback = []) => {
  if (value == null) return fallback
  if (typeof value !== 'string') return value
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

const PROFILE_FIELDS = [
  'full_name', 'headline', 'titles', 'about_short', 'about_long', 'avatar_url',
  'resume_url', 'email', 'github_url', 'linkedin_url', 'instagram_url',
]
const PROJECT_FIELDS = [
  'title', 'short_description', 'full_description', 'image_url', 'technologies',
  'category', 'demo_url', 'repo_url', 'is_live', 'highlights',
]
const TECH_FIELDS = ['name', 'image_url', 'category', 'proficiency', 'years', 'desc']
const JSON_FIELDS = new Set(['titles', 'technologies', 'highlights'])

function toDbValue(field, value) {
  if (JSON_FIELDS.has(field)) return JSON.stringify(Array.isArray(value) ? value : [])
  if (field === 'is_live') return value ? 1 : 0
  if (field === 'proficiency' || field === 'years') return Number(value) || 0
  return value ?? null
}

/** Pick only known columns present in `data` and convert them for MySQL. */
function pickColumns(data, fields) {
  const cols = fields.filter((f) => data[f] !== undefined)
  return { cols, values: cols.map((f) => toDbValue(f, data[f])) }
}

const mapProfile = (row) =>
  row ? { ...stripTimestamps(row), titles: parseJson(row.titles) } : null

const mapProject = (row) => ({
  ...stripTimestamps(row),
  technologies: parseJson(row.technologies),
  highlights: parseJson(row.highlights),
  is_live: Boolean(row.is_live),
})

const mapTech = (row) => stripTimestamps(row)

function stripTimestamps(row) {
  const { created_at, updated_at, ...rest } = row
  return rest
}

// ── Read Operations ──

export async function getProfile() {
  const rows = await query('SELECT * FROM profile WHERE id = 1 LIMIT 1')
  return mapProfile(rows[0]) || {}
}

/** All projects, newest first */
export async function getProjects() {
  const rows = await query('SELECT * FROM projects ORDER BY id DESC')
  return rows.map(mapProject)
}

export async function getProjectById(id) {
  const rows = await query('SELECT * FROM projects WHERE id = ? LIMIT 1', [Number(id)])
  return rows[0] ? mapProject(rows[0]) : null
}

/** All tech stacks, sorted by proficiency descending */
export async function getTechStacks() {
  const rows = await query('SELECT * FROM tech_stacks ORDER BY proficiency DESC, id ASC')
  return rows.map(mapTech)
}

export async function getTechStackById(id) {
  const rows = await query('SELECT * FROM tech_stacks WHERE id = ? LIMIT 1', [Number(id)])
  return rows[0] ? mapTech(rows[0]) : null
}

export async function getTopTechStacks(limit = 5) {
  const rows = await query('SELECT * FROM tech_stacks ORDER BY proficiency DESC, id ASC LIMIT ?', [Number(limit)])
  return rows.map(mapTech)
}

export async function getTechStacksByCategory() {
  const stacks = await getTechStacks()
  return {
    language: stacks.filter((t) => t.category === 'language'),
    framework: stacks.filter((t) => t.category === 'framework'),
    database: stacks.filter((t) => t.category === 'database'),
    tool: stacks.filter((t) => t.category === 'tool'),
  }
}

// ── Write Operations ──

export async function saveProfile(data) {
  const { cols, values } = pickColumns(data, PROFILE_FIELDS)
  if (cols.length) {
    const colSql = cols.map((c) => `\`${c}\``).join(', ')
    const placeholders = cols.map(() => '?').join(', ')
    const updates = cols.map((c) => `\`${c}\` = VALUES(\`${c}\`)`).join(', ')
    await query(
      `INSERT INTO profile (id, ${colSql}) VALUES (1, ${placeholders}) ON DUPLICATE KEY UPDATE ${updates}`,
      values
    )
  }
  return getProfile()
}

async function upsert(table, fields, data, getById) {
  const { cols, values } = pickColumns(data, fields)
  const id = data.id ? Number(data.id) : null

  if (id && (await getById(id))) {
    if (cols.length) {
      const set = cols.map((c) => `\`${c}\` = ?`).join(', ')
      await query(`UPDATE \`${table}\` SET ${set} WHERE id = ?`, [...values, id])
    }
    return getById(id)
  }

  const colSql = cols.map((c) => `\`${c}\``).join(', ')
  const placeholders = cols.map(() => '?').join(', ')
  const result = await query(`INSERT INTO \`${table}\` (${colSql}) VALUES (${placeholders})`, values)
  return getById(result.insertId)
}

export function saveProject(project) {
  return upsert('projects', PROJECT_FIELDS, project, getProjectById)
}

export async function deleteProject(id) {
  await query('DELETE FROM projects WHERE id = ?', [Number(id)])
}

export function saveTechStack(tech) {
  return upsert('tech_stacks', TECH_FIELDS, tech, getTechStackById)
}

export async function deleteTechStack(id) {
  await query('DELETE FROM tech_stacks WHERE id = ?', [Number(id)])
}
