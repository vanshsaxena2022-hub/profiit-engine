export const dynamic = "force-dynamic"
export const runtime = "nodejs"
export const revalidate = 0

export default async function ProductPage(props: any) {
  // Print EVERYTHING Next is giving us
  return (
    <div style={{ padding: 40 }}>
      <h1>Full Props Debug</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}