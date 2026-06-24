import type {Metadata} from "next"
import Script from "next/script"
import {Inter} from "next/font/google"
import {Header} from "@/app/components/header"
import {Footer} from "@/app/components/footer"
import {TopDetector} from "@/app/components/top-detector"
import {BackToTop} from "@/app/components/back-to-top"
import {Color, SITE_TITLE, SITE_DESCRIPTION} from "@/app/constant"
import "./globals.css"
import GA from "@/app/components/ga"

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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });`}
            </Script>
            <GA />
          </>
        )}
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
