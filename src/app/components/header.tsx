import Link from "next/link"
import {ROUTES, SOCIAL_MEDIA} from "@/app/constant"

export const Header = () => {
  return (
    <div className="fixed top-0 w-full bg-opacity-25 bg-black flex flex-row justify-center">
      <nav className="w-full max-w-6xl p-4 z-10 items-center justify-between font-mono text-lg text-white lg:flex">
        <Link href="/">年年有魚</Link>
        {ROUTES.map((route, index) => (
          <Link href={route.path}>{route.title}</Link>
        ))}
        <div className="flex flex-row gap-1">
          {SOCIAL_MEDIA.map((media, index) => (
            <a key={`social-media-link-${index}`} href={media.url} target="_blank">
              {media.icon}
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}
