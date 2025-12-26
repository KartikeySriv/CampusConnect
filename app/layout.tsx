import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "CampusConnect",
  description: "Unified Campus Life Platform",
  icons: {
    icon: "https://images.squarespace-cdn.com/content/v1/5d892f94afd4fc4e074a830f/1634353381425-6RHT4IR5K29VXVCSCF01/logo-bluebg.png", // or "/icon.png"
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-background text-foreground antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
