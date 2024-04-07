import Link from "next/link"

export const More = (props: {href: string; title: string}) => {
  const {href, title} = props

  return (
    <Link
      className="my-4 px-8 py-3 border border-blue-200 rounded-full hover:bg-blue-200 transition-colors duration-300"
      href={href}
    >
      <h3>{`看更多${title}`}</h3>
    </Link>
  )
}
