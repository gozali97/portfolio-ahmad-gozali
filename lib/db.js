import mysql from "mysql2/promise"

// Reuse a single pool across hot reloads in development.
const globalForDb = globalThis

export const pool =
  globalForDb.__mysqlPool ||
  mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || "",
    ssl: ["1", "true", "yes"].includes(String(process.env.DB_SSL).toLowerCase())
      ? { minVersion: "TLSv1.2", rejectUnauthorized: true }
      : undefined,
    waitForConnections: true,
    connectionLimit: 10,
  })

if (process.env.NODE_ENV !== "production") globalForDb.__mysqlPool = pool

export async function query(sql, params = []) {
  const [rows] = await pool.query(sql, params)
  return rows
}
