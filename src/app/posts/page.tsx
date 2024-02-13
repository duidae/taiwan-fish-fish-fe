import { List } from '@/app/components/list'
import { postOGs } from '../post-mockups'

export default function Posts() {
  const postSummaries = [...postOGs, ...postOGs]

  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <List summaries={postSummaries} title='所有文章'/>
    </main>
  )
}
