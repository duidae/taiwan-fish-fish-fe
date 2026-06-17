import dynamic from "next/dynamic"

const DynamicMap = dynamic(() => import("@/app/components/map"), {
  ssr: false
})

export default function Map() {
  return (
    <main className="w-full flex flex-col items-center justify-between mt-24 mb-8">
      <div className="w-full h-screen">
        <DynamicMap />
      </div>
    </main>
  )
}
