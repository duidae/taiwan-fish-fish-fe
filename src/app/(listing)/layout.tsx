import {Color} from "@/app/constant"

export default function ListingLayout({children}: {children: React.ReactNode}) {
  return (
    <main className={`w-full flex flex-col items-center mt-16 mb-8`}>
      <div className={`max-w-screen-2xl w-full flex flex-col divide-y divide-${Color.HOVER} gap-10 px-8`}>
        {children}
      </div>
    </main>
  )
}
