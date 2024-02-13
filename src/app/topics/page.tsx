import { List } from '@/app/components/list'
import { postOGs } from '../post-mockups'

export default function Topics() {
  const topicSummaries = [...postOGs, ...postOGs]

  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <List summaries={topicSummaries} title='所有專題'/>
    </main>
  )
}
