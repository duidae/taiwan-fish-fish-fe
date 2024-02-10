export const Video = (props: {ytURL: string}) => {
  // TODO: fix autoplay
  return (
    <div className="flex flex-col justify-center w-1/3 ml-10">
      <iframe width="100%" src={props.ytURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  )
}
