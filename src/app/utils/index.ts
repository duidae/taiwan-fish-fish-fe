export const GetRandomInteger = (max: number) => {
  return Math.floor(Math.random() * max)
}

export const GetIDFromYTURL = (ytURL: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = ytURL.match(regExp)

  if (match?.[2]?.length == 11) {
    return match[2]
  } else {
    return undefined
  }
}
