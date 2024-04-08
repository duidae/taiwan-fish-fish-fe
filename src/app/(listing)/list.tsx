import {Slider} from "@/app/components/slider"

export const List = (props: {
  featuredComponents: React.ReactNode[]
  listComponents: React.ReactNode
  title: string
}) => {
  const {featuredComponents, listComponents, title} = props

  const featured = (
    <div className="flex flex-col w-full items-center">
      <h1 className="my-8">精選{title}</h1>
      <div className="w-full">
        <Slider slides={featuredComponents} />
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
    <>
      {featured}
      {all}
    </>
  )
}
