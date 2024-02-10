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
    <div className='bg-blue-200 flex flex-col w-full h-screen justify-center items-center pt-24'>
      <div className="flex flex-row w-full h-full">
        <Video className='w-1/3' ytURL={ytURL}/>
        <Playground className='w-2/3'/>
      </div>
      <Goto className='h-1/6' elementID={postSectionID}>看文章</Goto>
    </div>
  )

  const postSection = (
    <div id={postSectionID} className="mt-16 mb-16 grid text-center w-4/5 lg:grid-cols-4 lg:text-left">
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
