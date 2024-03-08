import Link from "next/link"
import {ROUTE_ABOUT, SOCIAL_MEDIA} from "@/app/constant"

export const Footer = () => {
  return (
      <div className="flex flex-row">
        <Link href={ROUTE_ABOUT.path}>{ROUTE_ABOUT.title}</Link>
        <div className="w-full flex flex-row">
          {SOCIAL_MEDIA.map((media, index) => (
            <Link key={`social-media-link-${index}`} href={media.url} target="_blank" rel="noopener noreferrer">
              {media.icon}
            </Link>
          ))}
        </div>
      </div>
  )
}
