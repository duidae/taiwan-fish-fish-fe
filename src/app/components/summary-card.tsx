import Link from 'next/link'
import Image from 'next/image'

export type Summary = {
  url: string
  ogImage: string
  ogTitle: string
  ogDescription: string
}

export const SummaryCard = (props: Summary) => {
  return (props.url &&
    <Link
      href={props.url}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={props.ogImage}
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <h2 className={`mb-3 text-2xl font-semibold`}>
        {props.ogTitle}{" "}
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        {props.ogDescription}
      </p>
    </Link>
  )
}
