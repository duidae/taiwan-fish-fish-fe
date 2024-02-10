export const Video = (props: { ytURL: string, className?: string }) => {
  // TODO: fix autoplay
  return (
    <div className={`${props.className} flex flex-col justify-center ml-10 mr-5`}>
      <iframe width="100%" src={props.ytURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  )
}
