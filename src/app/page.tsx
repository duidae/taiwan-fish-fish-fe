import { Video } from '@/app/components/video'
import { Playground } from '@/app/components/playground'
import { PostCard } from '@/app/components/post-card'
import { postOGs } from './post-mockups'

export default function Home() {
  const ytURL = 'https://www.youtube.com/embed/aod40An1DLQ?si=_Y18xwVEIoOHQTLJ'
  const posts = postOGs

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="flex flex-row">
        <Video ytURL={ytURL}/>
        <Playground/>
      </div>
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
    </main>
  )
}
