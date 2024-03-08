import Link from "next/link"
import {Summary, SummaryCard} from "@/app/components/summary-card"

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
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full grow flex flex-row justify-center items-stretch">
        <div className="w-1/2">{isLeft ? headline : featured}</div>
        <div className="w-1/2">{isLeft ? featured : headline}</div>
      </div>
      <Link className="h-20 text-base" href={route}>
        看全部{title}
        {" >>"}
      </Link>
    </div>
  )
}

export const FeaturedPosts = (
  props: FeaturedSectionCommonprops & {
    headline: Summary
    featured: Summary[]
  }
) => {
  const {headline, featured, ...rest} = props

  const headlineComponent = false && <SummaryCard {...headline} />
  const featuredComponent = false && featured.map(summary => <SummaryCard {...summary} />)
  return <FeaturedSection headline={headlineComponent} featured={featuredComponent} {...rest} />
}

export const FeaturedTopics = (
  props: FeaturedSectionCommonprops & {
    headline: Summary
    featured: Summary[]
  }
) => {
  const {headline, featured, ...rest} = props

  const headlineComponent = false && <SummaryCard {...headline} />
  const featuredComponent = false && featured.map(summary => <SummaryCard {...summary} />)
  return <FeaturedSection headline={headlineComponent} featured={featuredComponent} {...rest} />
}
