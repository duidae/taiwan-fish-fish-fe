import type {Metadata} from "next"
import {Inter} from "next/font/google"
import {Header} from "@/app/components/header"
import {Footer} from "@/app/components/footer"
import {TopDetector} from "@/app/components/top-detector"
import {BackToTop} from "@/app/components/back-to-top"
import {Color, SITE_TITLE, SITE_DESCRIPTION} from "@/app/constant"
import "./globals.css"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <TopDetector />
        <div className="flex flex-col w-full min-h-screen items-center">
          {children}
          <div className={`w-full flex flex-col items-center bg-${Color.THEME}`}>
            <Footer />
          </div>
          <BackToTop />
        </div>
      </body>
    </html>
  )
}
