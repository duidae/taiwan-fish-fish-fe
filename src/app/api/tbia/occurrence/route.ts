import {NextRequest, NextResponse} from "next/server"

const TBIA_OCCURRENCE_URL = "https://tbiadata.tw/api/v1/occurrence"

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name")?.trim()
  const limit = req.nextUrl.searchParams.get("limit") ?? "100"
  if (!name) {
    return NextResponse.json({error: "missing name"}, {status: 400})
  }
  try {
    const upstream = await fetch(`${TBIA_OCCURRENCE_URL}?name=${encodeURIComponent(name)}&limit=${limit}`, {
      cache: "no-store"
    })
    if (!upstream.ok) {
      return NextResponse.json({error: "upstream error"}, {status: 502})
    }
    const data = await upstream.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({error: "failed to fetch TBIA occurrence data"}, {status: 500})
  }
}
