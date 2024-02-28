import dynamic from 'next/dynamic'

export const GetRandomInteger = (max: number) => {
  return Math.floor(Math.random() * max)
}

export const NextReactP5Wrapper = dynamic(
  async () => (await import("@p5-wrapper/react")).ReactP5Wrapper,
  { ssr: false },
)
