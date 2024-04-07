import Link from "next/link"
import {Summary, SummaryCard, DisplayMode} from "@/app/components/summary-card"
import {HEADER_HEIGHT, TOC_WIDTH, Direction} from "@/app/constant"
import {BackToSection} from "./back-to-section"

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
  const {id, title, route, headline, featured, direction} = props
  const isLeft = direction === Direction.LEFT

  return (
    <div
      className="max-w-screen-2xl max-h-screen w-full h-screen flex flex-col justify-center items-center"
      style={{paddingTop: `${HEADER_HEIGHT}px`, paddingRight: `${TOC_WIDTH}px`, paddingLeft: `${TOC_WIDTH}px`}}
    >
      <div className="flex flex-row items-center gap-2">
        <h1>精選{title}</h1>
        <BackToSection id={id} />
      </div>
      <div className="w-full grow flex flex-row justify-center items-stretch">
        <div className="w-1/2">{isLeft ? headline : featured}</div>
        <div className="w-1/2">{isLeft ? featured : headline}</div>
      </div>
      <Link
        className="h-20 my-4 px-8 py-4 border-2 border-blue-200 rounded-full hover:bg-blue-200 transition-colors duration-300"
        href={route}
      >
        <h3>{`看更多${title}`}</h3>
      </Link>
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
