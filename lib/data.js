import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

/**
 * Read and parse a JSON file from the data directory.
 * Used in Server Components and API routes only.
 */
function readJsonFile(filename) {
  const filePath = path.join(dataDir, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

/**
 * Get profile data (single object)
 */
export function getProfile() {
  return readJsonFile('profile.json')
}

/**
 * Get all projects, sorted by id descending (newest first)
 */
export function getProjects() {
  const projects = readJsonFile('projects.json')
  return projects.sort((a, b) => b.id - a.id)
}

/**
 * Get a single project by ID
 */
export function getProjectById(id) {
  const projects = readJsonFile('projects.json')
  return projects.find((p) => p.id === Number(id)) || null
}

/**
 * Get all tech stacks, sorted by proficiency descending
 */
export function getTechStacks() {
  const stacks = readJsonFile('techStacks.json')
  return stacks.sort((a, b) => b.proficiency - a.proficiency)
}

/**
 * Get top N tech stacks by proficiency
 */
export function getTopTechStacks(limit = 5) {
  const stacks = getTechStacks()
  return stacks.slice(0, limit)
}

/**
 * Get tech stacks grouped by category
 */
export function getTechStacksByCategory() {
  const stacks = getTechStacks()
  return {
    language: stacks.filter((t) => t.category === 'language'),
    framework: stacks.filter((t) => t.category === 'framework'),
    database: stacks.filter((t) => t.category === 'database'),
    tool: stacks.filter((t) => t.category === 'tool'),
  }
}

/**
 * Write data to a JSON file in the data directory.
 */
function writeJsonFile(filename, data) {
  const filePath = path.join(dataDir, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

/**
 * Get next available ID for a collection
 */
export function getNextId(filename) {
  const items = readJsonFile(filename)
  if (!Array.isArray(items) || items.length === 0) return 1
  return Math.max(...items.map((i) => i.id)) + 1
}

// ── Write Operations ──

export function saveProfile(data) {
  writeJsonFile('profile.json', data)
  return data
}

export function saveProject(project) {
  const projects = readJsonFile('projects.json')
  const idx = projects.findIndex((p) => p.id === project.id)
  if (idx >= 0) {
    projects[idx] = { ...projects[idx], ...project }
  } else {
    project.id = getNextId('projects.json')
    projects.push(project)
  }
  writeJsonFile('projects.json', projects)
  return project
}

export function deleteProject(id) {
  const projects = readJsonFile('projects.json')
  const filtered = projects.filter((p) => p.id !== Number(id))
  writeJsonFile('projects.json', filtered)
}

export function saveTechStack(tech) {
  const stacks = readJsonFile('techStacks.json')
  const idx = stacks.findIndex((t) => t.id === tech.id)
  if (idx >= 0) {
    stacks[idx] = { ...stacks[idx], ...tech }
  } else {
    tech.id = getNextId('techStacks.json')
    stacks.push(tech)
  }
  writeJsonFile('techStacks.json', stacks)
  return tech
}

export function deleteTechStack(id) {
  const stacks = readJsonFile('techStacks.json')
  const filtered = stacks.filter((t) => t.id !== Number(id))
  writeJsonFile('techStacks.json', filtered)
}
