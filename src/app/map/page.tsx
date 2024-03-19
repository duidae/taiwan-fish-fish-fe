import dynamic from "next/dynamic"

const DynamicMap = dynamic(() => import("@/app/components/map"), {
  ssr: false
})

export default function Map() {
  return (
    <main className="flex flex-col w-full items-center justify-between mt-16 mb-8">
      <div className="w-full h-screen">
        <DynamicMap />
      </div>
    </main>
  )
}
