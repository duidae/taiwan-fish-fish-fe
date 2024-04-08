import Link from "next/link"
import {EmailIcon} from "@/app/icons"
import {SubscribeBtn} from "@/app/components/subscription"
import {COPYRIGHT, EMAIL, ORGANIZATION, ROUTE_ABOUT, SOCIAL_MEDIA, SITE_DESCRIPTION, Color} from "@/app/constant"

export const Footer = () => {
  const logo = <img className="w-10 h-10" src="" />

  const desc = <div className="p-8">{SITE_DESCRIPTION}</div>

  const about = (
    <div className="flex flex-col gap-2">
      <h3 className="mb-4">{"關於我們"}</h3>
      <Link href={ROUTE_ABOUT.path}>{ROUTE_ABOUT.title}</Link>
      <SubscribeBtn />
    </div>
  )

  const socialMedia = (
    <div className="flex flex-col gap-2">
      <h3 className="mb-4">{"關注我們"}</h3>
      <div className="w-full flex flex-row gap-2">
        {SOCIAL_MEDIA.map((media, index) => (
          <Link key={`social-media-link-${index}`} href={media.url} target="_blank" rel="noopener noreferrer">
            {media.icon}
          </Link>
        ))}
        <Link href={`mailto: ${EMAIL}`} style={{color: "var(--theme-blue)"}}>
          {EmailIcon}
        </Link>
      </div>
    </div>
  )

  const copyright = `${COPYRIGHT} ${ORGANIZATION}`

  // TODO: fix divider color issue
  return (
    <div className="max-w-screen-2xl w-full flex flex-row justify-between mt-12 mb-8 p-8">
      <div className="w-1/2 flex flex-col items-center p-4">
        {logo}
        {desc}
      </div>
      <div className={`w-1/2 flex flex-col divide-y divide-${Color.HOVER} justify-between`}>
        <div className="flex flex-row justify-start items-start gap-16 mb-8">
          {about}
          {socialMedia}
        </div>
        <div className="py-4">{copyright}</div>
      </div>
    </div>
  )
}
