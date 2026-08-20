"use client"
import {useState} from "react"
import Link from "next/link"
import {ROUTE_HEADER, Z_INDEX} from "@/app/constant"
import {CrossIcon, HamburgerIcon} from "@/app/assets/icons"

export const Header = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)

  const onHamburgerOpen = () => {
    setIsHamburgerOpen(true)
  }

  const onHamburgerClose = () => {
    setIsHamburgerOpen(false)
  }

  const logo = (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 via-cyan-500 to-teal-500 text-lg shadow-md shadow-sky-500/40 ring-1 ring-white/20 transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110">
        🐟
      </span>
      <span className="font-mono text-lg md:text-xl font-bold tracking-wide bg-gradient-to-r from-sky-300 via-cyan-200 to-white bg-clip-text text-transparent">
        台灣阿魚
      </span>
    </Link>
  )

  const routes = ROUTE_HEADER.map((route: any, index: number) => {
    if (route.children && Array.isArray(route.children)) {
      return (
        <div className="relative group" key={`header-router-${route.title}`}>
          <button
            type="button"
            className="flex items-center gap-1 transition-colors hover:text-sky-300"
            aria-haspopup="true"
          >
            <span>{route.title}</span>
            <span className="ml-2 transition-transform group-hover:rotate-180">▾</span>
          </button>
          <div className="absolute right-0 w-48 bg-slate-800/95 backdrop-blur-md text-white rounded-lg shadow-xl shadow-black/40 ring-1 ring-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
            <nav className="flex flex-col p-2">
              {route.children.map((child: any) =>
                child.external ? (
                  <a
                    key={`child-${child.title}`}
                    className="px-3 py-2 hover:bg-sky-500/20 hover:text-sky-300 rounded underline"
                    href={child.path}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {child.title}
                  </a>
                ) : (
                  <Link
                    key={`child-${child.title}`}
                    className="px-3 py-2 hover:bg-sky-500/20 hover:text-sky-300 rounded"
                    href={child.path}
                  >
                    {child.title}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      )
    }

    return (
      <Link
        className="relative group transition-colors hover:text-sky-300"
        key={`header-router-${route.title}`}
        href={route.path}
      >
        <span>{route.title}</span>
        <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-sky-400 transition-all"></span>
      </Link>
    )
  })

  const menu = (
    <nav className="hidden w-full max-w-4xl md:flex flex-row justify-end items-center font-mono text-md md:text-lg text-white gap-4 md:gap-8 lg:gap-16">
      {routes}
    </nav>
  )

  const mobileMenu = (
    <>
      {!isHamburgerOpen && (
        <button aria-label="Open menu" type="button" className="block md:hidden" onClick={onHamburgerOpen}>
          {HamburgerIcon}
        </button>
      )}
      {isHamburgerOpen && (
        <div className="absolute right-0 top-0 md:hidden flex flex-col p-4 bg-slate-800/95 backdrop-blur-md ring-1 ring-sky-400/20 shadow-xl shadow-black/40">
          <div className="flex flex-row justify-end">
            <button aria-label="Close menu" type="button" className="" onClick={onHamburgerClose}>
              {CrossIcon}
            </button>
          </div>
          <nav className="max-w-4xl flex flex-col justify-end items-start font-mono text-xl text-white pt-2 gap-4 md:gap-8 lg:gap-16">
            {ROUTE_HEADER.map((route: any) => {
              const renderMobileItem = () => {
                if (route.external) {
                  return (
                    <a className="px-3 py-2 block" href={route.path} target="_blank" rel="noreferrer">
                      {route.title}
                    </a>
                  )
                }
                return (
                  <Link className="px-3 py-2 block" href={route.path}>
                    {route.title}
                  </Link>
                )
              }

              return (
                <div key={`mobile-route-${route.title}`} className="w-full">
                  {route.children && Array.isArray(route.children) ? (
                    <details className="w-full">
                      <summary className="px-3 py-2 cursor-pointer">{route.title}</summary>
                      <div className="flex flex-col pl-4">
                        {route.children.map((child: any) =>
                          child.external ? (
                            <a
                              key={`m-child-${child.title}`}
                              className="px-3 py-2 hover:bg-sky-500/20 hover:text-sky-300 rounded"
                              href={child.path}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {child.title}
                            </a>
                          ) : (
                            <Link
                              key={`m-child-${child.title}`}
                              className="px-3 py-2 hover:bg-sky-500/20 hover:text-sky-300 rounded"
                              href={child.path}
                            >
                              {child.title}
                            </Link>
                          )
                        )}
                      </div>
                    </details>
                  ) : (
                    renderMobileItem()
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )

  return (
    <div
      className={`fixed top-0 w-full h-16 flex flex-row justify-between items-center px-6 md:px-10 bg-gradient-to-r from-black via-slate-900 to-black backdrop-blur-md border-b border-sky-400/20 shadow-lg shadow-black/40 ${Z_INDEX.TOP}`}
    >
      {logo}
      {menu}
      {mobileMenu}
    </div>
  )
}
