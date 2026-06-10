import {NextResponse} from "next/server"
import fs from "fs/promises"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "rivers20191022.geojson")
    const content = await fs.readFile(filePath, "utf-8")
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "application/geo+json"
      }
    })
  } catch (err) {
    return NextResponse.json({error: "file not found"}, {status: 404})
  }
}
