// Database CLI: versioned SQL migrations (db/migrations/*.sql) + JSON seeders (data/*.json).
//
//   node scripts/db.mjs <command> [--env <path>] [--force]
//
// Commands:
//   migrate   Create the database (if allowed) and run pending migrations
//   seed      Seed tables from data/*.json (only tables that are still empty)
//   setup     migrate + seed
//   status    List applied / pending migrations
//   fresh     DROP all tables, then migrate + seed (refused in production unless --force)
//
// Env: DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD,
//      DB_SSL=true (managed/cloud MySQL), DB_CREATE_DATABASE=false (skip CREATE DATABASE on hosts without permission).
// Variables already present in the environment (CI/Vercel) take precedence over the env file.
import fs from 'fs'
import path from 'path'
import mysql from 'mysql2/promise'

const ROOT = process.cwd()
const MIGRATIONS_DIR = path.join(ROOT, 'db', 'migrations')
const DATA_DIR = path.join(ROOT, 'data')

// ── Args & env ──
const args = process.argv.slice(2)
const command = args.find((a) => !a.startsWith('--')) || 'setup'
const force = args.includes('--force')
const envIdx = args.indexOf('--env')
const envFile = envIdx !== -1 ? args[envIdx + 1] : '.env'

if (envFile && fs.existsSync(path.resolve(ROOT, envFile))) {
  process.loadEnvFile(path.resolve(ROOT, envFile))
  console.log(`Loaded env from ${envFile}`)
} else if (envIdx !== -1) {
  fail(`Env file not found: ${envFile}`)
}

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = '3306',
  DB_DATABASE,
  DB_USERNAME = 'root',
  DB_PASSWORD = '',
  DB_SSL,
  DB_CREATE_DATABASE = 'true',
} = process.env

if (!DB_DATABASE) fail('DB_DATABASE is not set.')

function fail(msg) {
  console.error(`✖ ${msg}`)
  process.exit(1)
}

const isTrue = (v) => ['1', 'true', 'yes'].includes(String(v).toLowerCase())
const q = (name) => `\`${name.replace(/`/g, '``')}\``

// ── Connection ──
async function connect() {
  const conn = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    multipleStatements: true,
    ssl: isTrue(DB_SSL) ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined,
  })
  if (isTrue(DB_CREATE_DATABASE)) {
    await conn.query(`CREATE DATABASE IF NOT EXISTS ${q(DB_DATABASE)} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
  }
  await conn.changeUser({ database: DB_DATABASE })
  return conn
}

// ── Migrations ──
async function ensureMigrationsTable(conn) {
  await conn.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      batch INT NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`)
}

const migrationFiles = () =>
  fs.existsSync(MIGRATIONS_DIR) ? fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith('.sql')).sort() : []

async function appliedMigrations(conn) {
  const [rows] = await conn.query('SELECT name FROM migrations ORDER BY id')
  return new Set(rows.map((r) => r.name))
}

async function migrate(conn) {
  await ensureMigrationsTable(conn)
  const applied = await appliedMigrations(conn)
  const pending = migrationFiles().filter((f) => !applied.has(f))
  if (!pending.length) return console.log('✔ Nothing to migrate.')

  const [[{ batch }]] = await conn.query('SELECT COALESCE(MAX(batch), 0) + 1 AS batch FROM migrations')
  for (const file of pending) {
    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf-8')
    // MySQL DDL auto-commits, so a failed migration stops here and is not recorded.
    await conn.query(sql)
    await conn.query('INSERT INTO migrations (name, batch) VALUES (?, ?)', [file, batch])
    console.log(`✔ Migrated ${file}`)
  }
}

async function status(conn) {
  await ensureMigrationsTable(conn)
  const applied = await appliedMigrations(conn)
  for (const f of migrationFiles()) console.log(`${applied.has(f) ? '✔ applied' : '… pending'}  ${f}`)
}

// ── Seeders ──
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'))
const json = (v) => JSON.stringify(Array.isArray(v) ? v : [])

const seeders = {
  profile: async (conn) => {
    const p = readJson('profile.json')
    await conn.query(
      `INSERT INTO profile (id, full_name, headline, titles, about_short, about_long, avatar_url,
        resume_url, email, github_url, linkedin_url, instagram_url) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [1, p.full_name, p.headline, json(p.titles), p.about_short, p.about_long, p.avatar_url,
        p.resume_url, p.email, p.github_url, p.linkedin_url, p.instagram_url]
    )
    return 1
  },
  projects: async (conn) => {
    const rows = readJson('projects.json')
    for (const p of rows) {
      await conn.query(
        `INSERT INTO projects (id, title, short_description, full_description, image_url, technologies,
          category, demo_url, repo_url, is_live, highlights) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [p.id, p.title, p.short_description, p.full_description, p.image_url, json(p.technologies),
          p.category, p.demo_url, p.repo_url, p.is_live ? 1 : 0, json(p.highlights)]
      )
    }
    return rows.length
  },
  tech_stacks: async (conn) => {
    const rows = readJson('techStacks.json')
    for (const t of rows) {
      await conn.query(
        'INSERT INTO tech_stacks (id, name, image_url, category, proficiency, years, `desc`) VALUES (?,?,?,?,?,?,?)',
        [t.id, t.name, t.image_url, t.category, t.proficiency, t.years, t.desc]
      )
    }
    return rows.length
  },
}

async function seed(conn) {
  for (const [table, run] of Object.entries(seeders)) {
    const [[{ n }]] = await conn.query(`SELECT COUNT(*) AS n FROM ${q(table)}`)
    if (Number(n) > 0) {
      console.log(`• Skipped ${table} (already has ${n} rows)`)
      continue
    }
    await conn.beginTransaction()
    try {
      const count = await run(conn)
      await conn.commit()
      console.log(`✔ Seeded ${table} (${count} rows)`)
    } catch (err) {
      await conn.rollback()
      throw err
    }
  }
}

async function dropAll(conn) {
  const [tables] = await conn.query(
    "SELECT TABLE_NAME AS name FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_TYPE = 'BASE TABLE'",
    [DB_DATABASE]
  )
  await conn.query('SET FOREIGN_KEY_CHECKS = 0')
  for (const { name } of tables) {
    await conn.query(`DROP TABLE ${q(name)}`)
    console.log(`✔ Dropped ${name}`)
  }
  await conn.query('SET FOREIGN_KEY_CHECKS = 1')
}

// ── Main ──
const commands = {
  migrate: (c) => migrate(c),
  seed: (c) => seed(c),
  setup: async (c) => { await migrate(c); await seed(c) },
  status: (c) => status(c),
  fresh: async (c) => {
    if (process.env.NODE_ENV === 'production' && !force) fail('Refusing to run "fresh" in production without --force.')
    await dropAll(c); await migrate(c); await seed(c)
  },
}

if (!commands[command]) fail(`Unknown command "${command}". Use: ${Object.keys(commands).join(', ')}`)

console.log(`→ ${command} on ${DB_USERNAME}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`)
const conn = await connect()
try {
  await commands[command](conn)
} catch (err) {
  console.error(`✖ ${err.message}`)
  process.exitCode = 1
} finally {
  await conn.end()
}
