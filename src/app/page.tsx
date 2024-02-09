import { Metadata } from 'next'
import Link from 'next/link'
import { Video } from '@/app/components/video'
import { Playground } from '@/app/components/playground'
import { PostCard } from '@/app/components/post-card'
import { SOCIAL_MEDIA, SITE_TITLE, SITE_DESCRIPTION } from './constant'
import { postOGs } from './post-mockups'

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
}

export default function Home() {
  const ytURL = 'https://www.youtube.com/embed/aod40An1DLQ?si=_Y18xwVEIoOHQTLJ'
  const posts = postOGs

  const header = (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <Link href="/">魚傳媒</Link>
      <Link href="/topic">專題</Link>
      <Link href="/post">文章</Link>
      <Link href="/map">找找魚</Link>
      {SOCIAL_MEDIA.map((media, index) => <a key={`social-media-link-${index}`} href={media.url} target='_blank'>{media.icon}</a>)}
    </div>
  )

  const interactive = (
    <div className="flex flex-row">
      <Video ytURL={ytURL}/>
      <Playground/>
    </div>
  )

  const postCards = (
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      {posts.map((post, index) =>
        <PostCard
          key={`post-list-${index}`}
          url={post.url}
          ogImage={post.ogImage}
          ogTitle={post.ogTitle}
          ogDescription={post.ogDescription}
          />
        )
      }
    </div>
  )

  const footer = (
    <div>{'Footer'}</div>
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      {header}
      {interactive}
      {postCards}
      {footer}
    </main>
  )
}
