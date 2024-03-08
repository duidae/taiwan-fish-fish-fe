import Link from "next/link"
import {Summary, SummaryCard} from "@/app/components/summary-card"
import {HEADER_HEIGHT, TOC_WIDTH} from "../constant"

export enum DIRECTION {
  Left = "LEFT",
  Right = "RIGHT"
}
export interface FeaturedSectionCommonprops {
  title: string
  route: string
  direction?: DIRECTION
}

type FeaturedSectionProps = FeaturedSectionCommonprops & {
  headline: React.ReactNode
  featured: React.ReactNode
}

export const FeaturedSection = (props: FeaturedSectionProps) => {
  const {title, route, headline, featured, direction} = props
  const isLeft = direction === DIRECTION.Left

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center gap-4"
      style={{paddingTop: `${HEADER_HEIGHT}px`, paddingRight: `${TOC_WIDTH}px`, paddingLeft: `${TOC_WIDTH}px`}}
    >
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

export const FeaturedTopics = (
  props: FeaturedSectionCommonprops & {
    headline: Summary
    featured: Summary[]
  }
) => {
  const {headline, featured, ...rest} = props
  const {title} = rest

  const headlineComponent = (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full text-center">精選{title}</div>
      <div className="w-full grow">
        <SummaryCard {...headline} />
      </div>
    </div>
  )

  const featuredComponent = (
    <div className="flex flex-col gap-4">
      {featured.map(summary => {
        return false && <SummaryCard {...summary} />
      })}
    </div>
  )

  return <FeaturedSection headline={headlineComponent} featured={featuredComponent} {...rest} />
}

export const FeaturedPosts = (
  props: FeaturedSectionCommonprops & {
    headline: Summary
    featured: Summary[]
  }
) => {
  const {headline, featured, ...rest} = props
  const {title} = rest

  const headlineComponent = (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full text-center">精選{title}</div>
      <div className="w-full grow">
        <SummaryCard {...headline} />
      </div>
    </div>
  )

  const featuredComponent = (
    <div className="flex flex-col gap-4">
      {featured.map(summary => {
        return false && <SummaryCard {...summary} />
      })}
    </div>
  )

  return <FeaturedSection headline={headlineComponent} featured={featuredComponent} {...rest} />
}
