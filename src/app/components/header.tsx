import Link from "next/link"
import {SITE_NAME, ROUTE_HEADER} from "@/app/constant"

export const Header = () => {
  return (
    <div className="fixed top-0 w-full bg-opacity-25 bg-black flex flex-row justify-center">
      <nav className="w-full max-w-6xl p-4 z-10 items-center justify-between font-mono text-lg text-white lg:flex">
        <Link href="/">{SITE_NAME}</Link>
        {ROUTE_HEADER.map((route, index) => (
          <Link key={`header-router-${index}`} href={route.path}>
            {route.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
