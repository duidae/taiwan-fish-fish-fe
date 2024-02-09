import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SOCIAL_MEDIA, SITE_TITLE, SITE_DESCRIPTION } from './constant'
import { postOGs } from './post-mockups'

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
}

export default function Home() {
  const videoURL = 'https://www.youtube.com/embed/aod40An1DLQ?si=_Y18xwVEIoOHQTLJ'

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
      <div>
        {/* TODO: fix autoplay */}
        <iframe width="560" height="315" src={videoURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
      <div>{'P5'}</div>
    </div>
  )

  const posts = (
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      {postOGs.map((post, index) => {
        return (
          <Link
          key={`post-list-${index}`}
          href={post.url}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
          >
            <Image src={post.ogImage}
              width={500}
              height={500}
              alt="Picture of the author"
            />
            <h2 className={`mb-3 text-2xl font-semibold`}>
              {post.ogTitle}{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              {post.ogDescription}
            </p>
          </Link>
        )
      })}
    </div>
  )

  const footer = (
    <div>{'Footer'}</div>
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      {header}
      {interactive}
      {posts}
      {footer}
    </main>
  )
}
