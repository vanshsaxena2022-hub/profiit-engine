export const dynamic = "force-dynamic"
export const runtime = "nodejs"
export const revalidate = 0

import { prisma } from "@/lib/prisma"

export default async function ProductPage() {

  try {
    const result: any = await prisma.$queryRawUnsafe(`
      SELECT current_database(), current_schema();
    `)

    return (
      <div style={{ padding: 40 }}>
        <h1>DB Info</h1>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    )

  } catch (error: any) {
    return (
      <div style={{ padding: 40 }}>
        <h1>DB Error</h1>
        <pre>{error?.message}</pre>
      </div>
    )
  }
}