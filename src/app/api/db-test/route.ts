import { NextResponse } from "next/server"
import { Pool } from "pg"

export const runtime = "nodejs"

export async function GET() {
  try {
    const pool = new Pool({
      connectionString: process.env.DIRECT_DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })

    const res = await pool.query("SELECT NOW()")

    return NextResponse.json({
      success: true,
      time: res.rows[0]
    })
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message
    })
  }
}