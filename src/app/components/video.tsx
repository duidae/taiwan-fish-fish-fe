export const Video = (props: {ytURL: string}) => {
  // TODO: fix autoplay
  return (
    <div>
      <iframe width="560" height="315" src={props.ytURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  )
}
