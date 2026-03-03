export const dynamic = "force-dynamic"
export const runtime = "nodejs"
export const revalidate = 0
export const dynamicParams = true

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Param Debug</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  )
}