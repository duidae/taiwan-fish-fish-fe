import {NextRequest, NextResponse} from "next/server"

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url)

  const tbiaUrl = new URL("https://tbiadata.tw/api/v1/map")

  searchParams.forEach((value, key) => {
    tbiaUrl.searchParams.set(key, value)
  })

  const response = await fetch(tbiaUrl.toString())

  if (!response.ok) {
    return NextResponse.json(
      {
        error: "TBIA API error"
      },
      {
        status: response.status
      }
    )
  }

  const data = await response.json()

  return NextResponse.json(data)
}
