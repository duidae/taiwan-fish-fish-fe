import {Metadata} from "next"
import {notFound} from "next/navigation"
import {BlockNoteRenderer} from "@/app/components/block-note-renderer"

// TODO: remove mockup
import {postMockup} from "@/app/mockups"

export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
  const {slug} = params

  return {
    /*
    title: `${topicMeta?.ogTitle ? topicMeta.ogTitle + ' - ' : ''}${OG_SUFFIX}`,
    alternates: {
      canonical: `${KIDS_URL_ORIGIN}/topic/${slug}`,
    },
    openGraph: {
      title: topicMeta?.ogTitle ?? OG_SUFFIX,
      description: topicMeta?.ogDescription ?? GENERAL_DESCRIPTION,
      images: topicMeta?.ogImage?.resized?.small
        ? [topicMeta.ogImage.resized.small]
        : [],
    },
    other: {
      // Since we can't inject <!-- <PageMap>...</PageMap> --> to <head> section with Next metadata API,
      // so handle google seo with extra <meta> tag here, but be awared there are limitations(maximum 50 tags):
      // https://developers.google.com/custom-search/docs/structured_data?hl=zh-tw#limitations
      publishedDate: topicMeta?.publishedDate ?? '',
      contentType: ContentType.TOPIC,
    },
    */
  }
}

export default async function Post({params}: {params: {slug: string}}) {
  const {slug} = params

  if (!slug) {
    return notFound()
  }

  const content = postMockup

  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <div className="w-4/5">
        <BlockNoteRenderer content={content} />
      </div>
    </main>
  )
}
