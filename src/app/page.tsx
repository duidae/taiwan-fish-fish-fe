import Link from 'next/link'
import { Video } from '@/app/components/video'
import { Playground } from '@/app/components/playground'
import { PostCard } from '@/app/components/post-card'
import { Goto } from '@/app/components/goto'
import { postOGs } from './post-mockups'

const contentSectionID = 'content-section'

export default function Home() {
  const ytURL = 'https://www.youtube.com/embed/aod40An1DLQ?si=_Y18xwVEIoOHQTLJ&autoplay=1&mute=1'

  const contents = [{
    title: '專題',
    route: '/topics',
    items: postOGs
  },
  {
    title: '文章',
    route: '/posts',
    items: postOGs
  }]

  // TODO: bg-[url('/test1.webp')]
  const interactiveSection = (
    <div className="bg-no-repeat bg-cover flex flex-col w-full h-screen justify-center items-center pt-24">
      <div className="flex flex-row w-full h-full">
        <Video className='w-1/3' ytURL={ytURL}/>
        <Playground className='w-2/3'/>
      </div>
      <Goto className='h-1/6 text-xl text-white' elementID={contentSectionID}>看文章</Goto>
    </div>
  )

  const contentSection = (
    <div id={contentSectionID}>
      {contents.map((content, index) => {
        return (
          <div key={`content-${index}`} className='flex flex-col justify-center items-center pt-8 mb-4'>
            <div className='text-2xl'>
              最新{content.title}
            </div>
            <div className="mt-8 mb-4 grid text-center w-4/5 lg:grid-cols-4 lg:text-left">
              {content.items.map((item, index) =>
                <PostCard
                  key={`post-list-${index}`}
                  url={item.url}
                  ogImage={item.ogImage}
                  ogTitle={item.ogTitle}
                  ogDescription={item.ogDescription}
                />
              )}
            </div>
            <Link className='text-base' href={content.route}>看全部{content.title}{' >>'}</Link>
          </div>
        )
      })}
    </div>
  )

  return (
    <main className="flex flex-col w-full items-center justify-between mb-8">
      {interactiveSection}
      {contentSection}
    </main>
  )
}
