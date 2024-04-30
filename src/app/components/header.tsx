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
    <Link className="mt-4 ml-10" href="/">
      <img className="h-20" src="/logo-horizontal.svg" />
    </Link>
  )

  const routes = ROUTE_HEADER.map((route, index) => (
    <Link className="relative group" key={`header-router-${index}`} href={route.path}>
      <span>{route.title}</span>
      <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-white transition-all"></span>
    </Link>
  ))

  const menu = (
    <nav className="hidden w-full max-w-4xl md:flex flex-row justify-end items-start font-mono text-md md:text-lg text-white mt-4 mr-8 pt-2 gap-4 md:gap-8 lg:gap-16">
      {routes}
    </nav>
  )

  const mobileMenu = (
    <>
      {!isHamburgerOpen && (
        <div className="block md:hidden mt-8 mr-8 cursor-pointer" onClick={onHamburgerOpen}>
          {HamburgerIcon}
        </div>
      )}
      {isHamburgerOpen && (
        <div className="absolute right-0 top-0 md:hidden flex flex-col p-4 bg-slate-700">
          <div className="flex flex-row justify-end cursor-pointer" onClick={onHamburgerClose}>
            {CrossIcon}
          </div>
          <nav className="max-w-4xl flex flex-col justify-end items-start font-mono text-md md:text-lg text-white pt-2 gap-4 md:gap-8 lg:gap-16">
            {routes}
          </nav>
        </div>
      )}
    </>
  )

  return (
    <div
      style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))"}}
      className={`fixed top-0 w-full flex flex-row justify-between ${Z_INDEX.TOP}`}
    >
      {logo}
      {menu}
      {mobileMenu}
    </div>
  )
}
