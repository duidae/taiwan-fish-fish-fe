export const Video = (props: { ytURL: string, className?: string }) => {
  // Autoplay only works when autoplay=1&mute=1
  return (
    <div className={`${props.className} flex flex-col justify-center ml-20 mr-5`}>
      <iframe width="100%" src={`${props.ytURL}&autoplay=1&mute=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  )
}
