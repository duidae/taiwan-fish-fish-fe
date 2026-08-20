import {NextRequest, NextResponse} from "next/server"

const RIVER_WATCHER_GETRIVER_URL = "https://river-watcher.bambooculture.tw/api/getriver"

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name")?.trim()
  if (!name) {
    return NextResponse.json({error: "missing name"}, {status: 400})
  }
  // Upstream requires at least 2 characters and returns a plain-text "error" body otherwise.
  if (name.length < 2) {
    return NextResponse.json({type: "FeatureCollection", features: []})
  }
  try {
    const upstream = await fetch(`${RIVER_WATCHER_GETRIVER_URL}?rivername=${encodeURIComponent(name)}`, {
      cache: "no-store"
    })
    if (!upstream.ok) {
      return NextResponse.json({error: "upstream error"}, {status: 502})
    }
    const data = await upstream.json()
    if (!data || data.type !== "FeatureCollection") {
      return NextResponse.json({type: "FeatureCollection", features: []})
    }
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({error: "failed to fetch river channel"}, {status: 500})
  }
}
