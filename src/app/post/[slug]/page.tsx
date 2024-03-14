import {PostRenderer} from "./post-renderer"

// TODO: remove mockup
import {postMockup} from "@/app/mockups"

export default function Post() {
  const content = postMockup

  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <PostRenderer content={content} />
    </main>
  )
}
