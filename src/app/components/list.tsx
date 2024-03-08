import {Summary, SummaryCard, DisplayMode} from "@/app/components/summary-card"

export const List = (props: {summaries: Summary[]; title: string}) => {
  return (
    <div className="flex flex-col justify-center items-center pt-8 mb-4">
      <div className="text-2xl">{props.title}</div>
      <div>Slider</div>
      <div className="mt-8 mb-4 grid text-center w-4/5 lg:grid-cols-4 lg:text-left gap-8">
        {props.summaries?.map((summary, index) => (
          <SummaryCard
            key={`post-list-${index}`}
            url={summary.url}
            ogImage={summary.ogImage}
            ogTitle={summary.ogTitle}
            ogDescription={summary.ogDescription}
            displayMode={DisplayMode.COLUMN}
          />
        ))}
      </div>
    </div>
  )
}
