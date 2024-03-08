import Link from "next/link"
import Image from "next/image"

export type Summary = {
  url: string
  ogImage: string
  ogTitle: string
  ogDescription: string
}

export const SummaryCard = (props: Summary) => {
  return (
    props.url && (
      <Link
        href={props.url}
        className="w-full h-full flex flex-col items-center justify-stretch group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-gray-100"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={props.ogImage} width={500} height={500} alt={props.ogTitle} />
        <h2 className={`mb-3 text-2xl font-semibold`}>{props.ogTitle} </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{props.ogDescription}</p>
      </Link>
    )
  )
}
