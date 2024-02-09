import { Metadata } from 'next'
import Link from 'next/link'
import { postOGs } from './post-mockups'

export const metadata: Metadata = {
  title: '魚傳媒 - 最有趣最新鮮的台灣原生魚類新聞',
  description: '', // TODO: fill up desc
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link href="/">年年有魚</Link>
        <Link href="/topic">專題</Link>
        <Link href="/post">文章</Link>
        <Link href="/map">地圖</Link>
        {/* TODO: fb link */}
      </div>

      <div className="flex flex-row">
        <div>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/aod40An1DLQ?si=_Y18xwVEIoOHQTLJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div>{'P5'}</div>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {postOGs.map((post, index) => {
          return (
            <a
            key={`post-list-${index}`}
            href={post.url}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                {post.ogTitle}{" "}
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {post.ogDescription}
              </p>
            </a>
          )
        })}
      </div>
      <div>{'Footer'}</div>
    </main>
  )
}
