import Link from "next/link"
import {Color, Direction, Style} from "@/app/constant"

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

  return (
    url && (
      <Link
        href={url}
        className={`w-full h-full flex ${flexAttr} gap-2 items-center justify-stretch p-4 group rounded-lg border border-transparent transition-colors hover:bg-${Color.HOVER} duration-${Style.DURATION}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          style={{backgroundImage: `url(${ogImage})`}}
          className={
            "rounded-md bg-no-repeat bg-center bg-cover " +
            (isColumn ? "max-h-full w-full h-full grow" : "w-1/3 h-full")
          }
        />
        <div className={isColumn ? "w-full" : "w-2/3 h-full"}>
          <h2
            style={{display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "1", overflow: "hidden"}}
            className={`text-2xl ${isRight ? "text-left" : "text-right"} font-semibold`}
          >
            {ogTitle}
          </h2>
          <p
            style={{display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "3", overflow: "hidden"}}
            className="w-full m-0 text-sm text-justify opacity-50"
          >
            {ogDescription}
          </p>
        </div>
      </Link>
    )
  )
}
