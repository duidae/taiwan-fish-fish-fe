import {Summary, SummaryCard, DisplayMode} from "@/app/components/summary-card"
import {More} from "@/app/components/more"
import {HEADER_HEIGHT, TOC_WIDTH, Direction, Color} from "@/app/constant"
import {BackToSection} from "./back-to-section"

export interface FeaturedSectionCommonprops {
  id: string
  title: string
  route: string
  direction?: Direction
  bgColor?: boolean
}

type FeaturedSectionProps = FeaturedSectionCommonprops & {
  headline: React.ReactNode
  featured: React.ReactNode
}

export const FeaturedSection = (props: FeaturedSectionProps) => {
  const {id, title, route, headline, featured, direction, bgColor} = props
  const isLeft = direction === Direction.LEFT

  return (
    <div
      className={`w-full h-screen flex flex-row justify-center ${bgColor ? `bg-${Color.BACKGROUND}` : ""}`}
      style={{paddingTop: `${HEADER_HEIGHT}px`, paddingRight: `${TOC_WIDTH}px`, paddingLeft: `${TOC_WIDTH}px`}}
    >
      <div className="max-w-screen-2xl w-full h-full flex flex-col justify-center items-center">
        <div className="flex flex-row items-center gap-2">
          <h1>精選{title}</h1>
          <BackToSection id={id} />
        </div>
        <div className="w-full grow flex flex-row justify-center items-stretch">
          <div className="w-1/2">{isLeft ? headline : featured}</div>
          <div className="w-1/2">{isLeft ? featured : headline}</div>
        </div>
        <More href={route} title={title} />
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
