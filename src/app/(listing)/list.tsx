import {Slider} from "@/app/components/slider"

export const List = (props: {
  featuredComponents: React.ReactNode[]
  listComponents: React.ReactNode
  title: string
  autoplay?: boolean
}) => {
  const {featuredComponents, listComponents, title, autoplay} = props

  const featured = (
    <div className="flex flex-col w-full items-center mb-8">
      <h1 className="my-8">精選{title}</h1>
      <div className="w-full">
        <Slider slides={featuredComponents} autoplay={autoplay} />
      </div>
    </div>
  )

  const all = (
    <div className="flex flex-col w-full items-center">
      <h1 className="my-8">所有{title}</h1>
      <div className="w-full grid text-center lg:grid-cols-3 md:grid-cols-2 lg:text-left gap-8 mb-4">
        {listComponents}
      </div>
    </div>
  )

  return (
    <div className="divide-y divide-gray-500">
      {featured}
      {all}
    </div>
  )
}
