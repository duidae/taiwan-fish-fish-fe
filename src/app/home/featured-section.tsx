import Link from "next/link"
import {Summary, SummaryCard} from "@/app/components/summary-card"

export enum DIRECTION {
  Left = "LEFT",
  Right = "RIGHT"
}
interface FeaturedSectionCommonprops {
  id: string
  title: string
  route: string
  direction?: DIRECTION
}

type FeaturedSectionProps = FeaturedSectionCommonprops & {
  headline: React.ReactNode
  featured: React.ReactNode
}

const FeaturedSection = (props: FeaturedSectionProps) => {
  const {id, title, route, headline, featured, direction} = props
  const isLeft = direction === DIRECTION.Left

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div id={id} className="w-full grow flex flex-row justify-center items-stretch">
        <div className={`${isLeft ? "w-3/5" : "w-2/5"}`}>{isLeft ? headline : featured}</div>
        <div className={`${isLeft ? "w-2/5" : "w-3/5"}`}>{isLeft ? featured : headline}</div>
      </div>
      <Link className="h-1/6 text-base" href={route}>
        看全部{title}
        {" >>"}
      </Link>
    </div>
  )
}

type URL = string

export const FeaturedVideos = (
  props: FeaturedSectionCommonprops & {
    headline: URL
    featured: URL[]
  }
) => {
  const {headline, featured, ...rest} = props

  // TODO: customize frontPage/featured
  return <FeaturedSection headline={headline} featured={featured} {...rest} />
}

export const FeaturedPosts = (
  props: FeaturedSectionCommonprops & {
    headline: Summary
    featured: Summary[]
  }
) => {
  const {headline, featured, ...rest} = props

  const headlineComponent = <SummaryCard {...headline} />
  const featuredComponent = featured.map(summary => <SummaryCard {...summary} />)
  return <FeaturedSection headline={headlineComponent} featured={featuredComponent} {...rest} />
}

export const FeaturedTopics = (
  props: FeaturedSectionCommonprops & {
    headline: Summary
    featured: Summary[]
  }
) => {
  const {headline, featured, ...rest} = props

  const headlineComponent = <SummaryCard {...headline} />
  const featuredComponent = featured.map(summary => <SummaryCard {...summary} />)
  return <FeaturedSection headline={headlineComponent} featured={featuredComponent} {...rest} />
}
