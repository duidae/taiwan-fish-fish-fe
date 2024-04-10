import Link from "next/link"
import {SITE_NAME, ROUTE_HEADER, Z_INDEX} from "@/app/constant"
import {SubscribeBtn} from "./subscription"

export const Header = () => {
  return (
    <div
      style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))"}}
      className="fixed top-0 w-full flex flex-row justify-center"
    >
      <nav
        className={`w-full max-w-6xl p-4 items-center justify-between font-mono text-lg text-white lg:flex ${Z_INDEX.TOP}`}
      >
        <Link href="/">{SITE_NAME}</Link>
        {ROUTE_HEADER.map((route, index) => (
          <Link key={`header-router-${index}`} href={route.path}>
            {route.title}
          </Link>
        ))}
        <SubscribeBtn />
      </nav>
    </div>
  )
}
