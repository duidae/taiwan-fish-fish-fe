import Link from "next/link"
import {Direction, DEFAULT_IMAGE_ASPECT_RATIO} from "@/app/constant"

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
  const isColumn = displayMode === DisplayMode.COLUMN
  const isRight = direction === Direction.RIGHT

  // Assign flex direction: flex-col/flex-row/flex-row-reverse
  const flexAttr = `flex-${isColumn ? "col" : "row"}${!isColumn && isRight ? "-reverse" : ""}`

  // TODO: ellipsis for <p>
  return (
    url && (
      <Link
        href={url}
        className={`w-full h-full flex ${flexAttr} gap-2 items-center justify-stretch px-4 group rounded-lg border border-transparent transition-colors hover:bg-gray-100`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={isColumn ? "max-w-full w-full grow" : "w-1/3"}>
          <img
            style={{aspectRatio: DEFAULT_IMAGE_ASPECT_RATIO}}
            className="w-full h-full overflow-hidden object-cover rounded-md"
            src={ogImage}
            alt={ogTitle}
          />
        </div>
        <div className={isColumn ? "w-full" : "w-2/3"}>
          <h2 className={`mb-3 text-2xl ${isRight ? "text-left" : "text-right"} font-semibold`}>{ogTitle}</h2>
          <p className="w-full m-0 text-sm opacity-50">{ogDescription}</p>
        </div>
      </Link>
    )
  )
}
