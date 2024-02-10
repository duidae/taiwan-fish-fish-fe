import Link from 'next/link'
import { SOCIAL_MEDIA } from '@/app/constant'

export const Header = () => {
  return (
    <div className="fixed top-0 bg-white p-4 z-10 max-w-6xl w-full items-center justify-between font-mono text-lg lg:flex">
      <Link href="/">魚傳媒</Link>
      <Link href="/topic">專題</Link>
      <Link href="/post">文章</Link>
      <Link href="/map">魚地圖</Link>
      {SOCIAL_MEDIA.map((media, index) => <a key={`social-media-link-${index}`} href={media.url} target='_blank'>{media.icon}</a>)}
    </div>
  )
}

