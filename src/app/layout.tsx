import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
// import { ThemeProvider } from "@/components/theme-provider"
// import { Toaster } from "@/components/ui/toaster"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "OrganicMarket - Fresh Organic Products",
  description: "Shop certified organic products directly from trusted farmers and producers.",
}

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          {/* <Toaster /> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}

