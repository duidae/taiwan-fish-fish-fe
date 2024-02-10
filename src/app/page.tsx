import { Video } from '@/app/components/video'
import { Playground } from '@/app/components/playground'
import { PostCard } from '@/app/components/post-card'
import { Goto } from '@/app/components/goto'
import { postOGs } from './post-mockups'

const postSectionID = 'post-section'

export default function Home() {
  const ytURL = 'https://www.youtube.com/embed/aod40An1DLQ?si=_Y18xwVEIoOHQTLJ'
  const posts = postOGs

  const interactiveSection = (
    <div className='bg-blue-200 flex flex-col w-full justify-center items-center min-h-screen'>
      <div className="flex flex-row w-full">
        <Video ytURL={ytURL}/>
        <Playground/>
      </div>
      <Goto elementID={postSectionID} label='看文章'/>
    </div>
  )

  const postSection = (
    <div id={postSectionID} className="mb-32 grid text-center w-full max-w-7xl lg:mb-0 lg:grid-cols-4 lg:text-left">
      {posts.map((post, index) =>
        <PostCard
          key={`post-list-${index}`}
          url={post.url}
          ogImage={post.ogImage}
          ogTitle={post.ogTitle}
          ogDescription={post.ogDescription}
        />
      )}
    </div>
  )

  return (
    <main className="flex flex-col w-full items-center justify-between">
      {interactiveSection}
      {postSection}
    </main>
  )
}
