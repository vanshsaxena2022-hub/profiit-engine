export async function GET() {
  return Response.json({
    db: process.env.DATABASE_URL ? "FOUND" : "MISSING",
    auth: process.env.NEXTAUTH_SECRET ? "FOUND" : "MISSING",
  });
}