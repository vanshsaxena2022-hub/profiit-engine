export const dynamic = "force-dynamic"
export const runtime = "nodejs"
export const revalidate = 0

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params

  return (
    <div style={{ padding: 40 }}>
      <h1>Param Debug</h1>
      <pre>{JSON.stringify(resolvedParams, null, 2)}</pre>
    </div>
  )
}