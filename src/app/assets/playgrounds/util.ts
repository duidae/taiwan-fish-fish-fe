import dynamic from "next/dynamic"

export const P5Wrapper = dynamic(async () => (await import("./p5-wrapper")).P5Wrapper, {ssr: false})
