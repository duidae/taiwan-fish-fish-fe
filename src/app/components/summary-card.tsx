import Link from "next/link"
import {Direction} from "@/app/constant"

export enum DisplayMode {
  ROW = "row",
  COLUMN = "column"
}

export type Summary = {
  url: string
  ogImage: string
  ogTitle: string
  ogDescription: string
  displayMode?: DisplayMode
  direction?: Direction
}

export const SummaryCard = (props: Summary) => {
  const {url, ogTitle, ogDescription, ogImage, displayMode, direction} = props
  const isRow = displayMode === DisplayMode.ROW
  const isLeft = direction === Direction.LEFT

  // Assign flex direction: flex-row/flex-col/flex-row-reverse/flex-col-reverse
  const flexAttr = `flex-${isRow ? "row" : "col"}${isLeft ? "" : "-reverse"}`

  // TODO: ellipsis for <p>
  return (
    url && (
      <Link
        href={url}
        className={`w-full h-full flex ${flexAttr} gap-2 items-center justify-stretch px-4 group rounded-lg border border-transparent transition-colors hover:bg-gray-100`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="w-1/3">
          <img className="overflow-hidden" src={ogImage} alt={ogTitle} />
        </div>
        <div className="w-2/3">
          <h2 className={`mb-3 text-2xl ${isLeft ? "text-right" : "text-left"} font-semibold`}>{ogTitle}</h2>
          <p className="w-full m-0 text-sm opacity-50">{ogDescription}</p>
        </div>
      </Link>
    )
  )
}
