import Link from "next/link"
import {SOCIAL_MEDIA} from "@/app/constant"

export const Footer = () => {
  return (
    <div className="w-full justify-center">
      <div className="flex flex-row max-w-5/6">
        <div className="w-full flex flex-row">
          {SOCIAL_MEDIA.map((media, index) => (
            <Link key={`social-media-link-${index}`} href={media.url} target="_blank">
              {media.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
