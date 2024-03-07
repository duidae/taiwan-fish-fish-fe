import Link from "next/link"

export enum DIRECTION {
  Left = "LEFT",
  Right = "RIGHT"
}

type FeaturedSectionProps = {
  id: string
  title: string
  route: string
  frontPage: React.ReactNode
  featured: React.ReactNode
  direction?: DIRECTION
}

const FeaturedSection = (props: FeaturedSectionProps) => {
  const {id, title, route, frontPage, featured, direction} = props
  const isLeft = direction === DIRECTION.Left

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div id={id} className="w-full grow flex flex-row justify-center items-stretch">
        <div className={`${isLeft ? "w-3/5" : "w-2/5"} bg-red-50`}>{frontPage}</div>
        <div className={`${isLeft ? "w-2/5" : "w-3/5"} bg-green-50`}>{featured}</div>
      </div>
      <Link className="h-1/6 text-base" href={route}>
        看全部{title}
        {" >>"}
      </Link>
    </div>
  )
}

export const FeaturedVideos = (props: FeaturedSectionProps) => {
  const {frontPage, featured, ...rest} = props

  // TODO: customize frontPage/featured
  return <FeaturedSection frontPage={featured} featured={featured} {...rest} />
}

export const FeaturedPosts = (props: FeaturedSectionProps) => {
  const {frontPage, featured, ...rest} = props

  // TODO: customize frontPage/featured
  return <FeaturedSection frontPage={featured} featured={featured} {...rest} />
}

export const FeaturedTopics = (props: FeaturedSectionProps) => {
  const {frontPage, featured, ...rest} = props

  // TODO: customize frontPage/featured
  return <FeaturedSection frontPage={featured} featured={featured} {...rest} />
}
