import Link from "next/link"
import {Summary, SummaryCard, DisplayMode} from "@/app/components/summary-card"
import {HEADER_HEIGHT, TOC_WIDTH, Direction} from "@/app/constant"

export interface FeaturedSectionCommonprops {
  id: string
  title: string
  route: string
  direction?: Direction
}

type FeaturedSectionProps = FeaturedSectionCommonprops & {
  headline: React.ReactNode
  featured: React.ReactNode
}

export const FeaturedSection = (props: FeaturedSectionProps) => {
  const {title, route, headline, featured, direction} = props
  const isLeft = direction === Direction.LEFT

  return (
    <div
      className="max-w-screen-2xl w-full h-full flex flex-col justify-center items-center gap-4"
      style={{paddingTop: `${HEADER_HEIGHT}px`, paddingRight: `${TOC_WIDTH}px`, paddingLeft: `${TOC_WIDTH}px`}}
    >
      <h1>精選{title}</h1>
      <div className="w-full grow flex flex-row justify-center items-stretch">
        <div className="w-1/2">{isLeft ? headline : featured}</div>
        <div className="w-1/2">{isLeft ? featured : headline}</div>
      </div>
      <div className="h-20 flex flex-row justify-center items-center">
        <Link href={route}>{`看全部${title} >>`}</Link>
      </div>
    </div>
  )
}

export const FeaturedTextContents = (
  props: FeaturedSectionCommonprops & {
    headline: Summary
    featured: Summary[]
  }
) => {
  const {headline, featured, ...rest} = props
  const {direction} = rest

  const headlineComponent = (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <SummaryCard {...headline} displayMode={DisplayMode.COLUMN} />
    </div>
  )

  const featuredComponent = (
    <div className="w-full h-full grid grid-rows-4 gap-2">
      {featured.map((summary, index) => {
        return (
          <div key={`featured-content-${index}`} className="w-full">
            <SummaryCard {...summary} displayMode={DisplayMode.ROW} direction={direction} />
          </div>
        )
      })}
    </div>
  )

  return <FeaturedSection headline={headlineComponent} featured={featuredComponent} {...rest} />
}
