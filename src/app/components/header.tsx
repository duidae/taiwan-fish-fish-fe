import Link from 'next/link'
import { SOCIAL_MEDIA } from '@/app/constant'

export const Header = () => {
  return (
    <nav className="fixed top-0 w-4/5 max-w-6xl bg-transparent p-4 z-10 items-center justify-between font-mono text-lg lg:flex">
      <Link href="/">魚傳媒</Link>
      <Link href="/topic">專題</Link>
      <Link href="/post">文章</Link>
      <Link href="/map">魚地圖</Link>
      <div className='flex flex-row gap-1'>
        {SOCIAL_MEDIA.map((media, index) => <a key={`social-media-link-${index}`} href={media.url} target='_blank'>{media.icon}</a>)}
      </div>
    </nav>
  )
}

