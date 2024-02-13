import Link from 'next/link'
import { FullscreenBackground } from '@/app/components/fullscreen-background'
import { Video } from '@/app/components/video'
import { Playground } from '@/app/components/playground'
import { List } from '@/app/components/list'
import { Goto } from '@/app/components/goto'
import { postOGs } from './post-mockups'

const contentSectionID = 'content-section'

export default function Home() {
  const ytURLs = [
    'https://www.youtube.com/embed/aod40An1DLQ?si=_Y18xwVEIoOHQTLJ',
    'https://www.youtube.com/embed/wPQnp65MYz4?si=s9NnnMzG6nXJzh_j',
    'https://www.youtube.com/embed/NehqK_atfVQ?si=-F0PfGHz09MyvJwl',
  ]

  const contents = [{
    title: '專題',
    route: '/topics',
    summaries: postOGs
  },
  {
    title: '文章',
    route: '/posts',
    summaries: postOGs
  }]

  // TODO: ['/test1.webp', '/test2.webp', '/test3.jpeg']
  const interactiveSection = (
    <FullscreenBackground
      imgSrcs={[]}
      body={
        <div className="flex flex-row w-full h-full">
          <Video className='w-1/3' ytURLs={ytURLs}/>
          <Playground className='w-2/3'/>
        </div>
      }
      bottom={<Goto className='h-1/6 text-xl text-white' elementID={contentSectionID}>看文章</Goto>}
    />
  )

  const contentSection = (
    <div id={contentSectionID}>
      {contents.map((content, index) => {
        return (
          <div key={`content-${index}`} className='flex flex-col justify-center items-center mb-4'>
            <List summaries={content.summaries} title={`最新${content.title}`}/>
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
