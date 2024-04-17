import Link from "next/link"
import {ROUTE_HEADER, Z_INDEX} from "@/app/constant"

export const Header = () => {
  const logo = (
    <Link className='mt-4 ml-16' href="/">
      <img className="h-20" src="/logo-horizontal.svg" />
    </Link>
  )

  const routes = ROUTE_HEADER.map((route, index) => (
    <Link key={`header-router-${index}`} href={route.path}>
      {route.title}
    </Link>
  ))

  return (
    <div
      style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))"}}
      className="fixed top-0 w-full flex flex-row justify-between"
    >
      {logo}
      <nav
        className={`w-full max-w-4xl flex flex-row justify-end items-start font-mono text-lg text-white mt-6 mr-4 gap-16 ${Z_INDEX.TOP}`}
      >
        {routes}
      </nav>
    </div>
  )
}
