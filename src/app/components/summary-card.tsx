import Link from "next/link"
import Image from "next/image"
import {DIRECTION} from "@/app/constant"

export type Summary = {
  url: string
  ogImage: string
  ogTitle: string
  ogDescription: string
  direction?: DIRECTION
}

export const SummaryCard = (props: Summary) => {
  const {url, ogTitle, ogDescription, ogImage, direction} = props
  return (
    url && (
      <Link
        href={url}
        className={`w-full h-full flex ${direction === DIRECTION.Left ? "flex-row" : "flex-row-reverse"} items-center justify-stretch group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-gray-100`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          {false && <Image src={ogImage} width={500} height={500} alt={ogTitle} />}
          <img className="overflow-hidden" src={ogImage} alt={ogTitle} />
        </div>
        <div>
          <h2 className={`mb-3 text-2xl font-semibold`}>{ogTitle} </h2>
          <p className={`w-full m-0 text-sm opacity-50`}>{ogDescription}</p>
        </div>
      </Link>
    )
  )
}
