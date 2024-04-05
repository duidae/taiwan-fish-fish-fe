import Link from "next/link"
import {EMAIL, ORGANIZATION, ROUTE_ABOUT, SOCIAL_MEDIA} from "@/app/constant"

export const Footer = () => {
  return (
    <div className="flex flex-row mt-12 mb-8">
      <Link href={ROUTE_ABOUT.path}>{ROUTE_ABOUT.title}</Link>
      <div className="w-full flex flex-row">
        {SOCIAL_MEDIA.map((media, index) => (
          <Link key={`social-media-link-${index}`} href={media.url} target="_blank" rel="noopener noreferrer">
            {media.icon}
          </Link>
        ))}
      </div>
      <div className="flex flex-col">
        {ORGANIZATION}
        <Link href={`mailto: ${EMAIL}`} style={{color: "var(--theme-blue)"}}>
          {EMAIL}
        </Link>
      </div>
    </div>
  )
}
