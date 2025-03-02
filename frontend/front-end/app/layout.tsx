import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { useAuthContext } from '../hooks/useAuthContext';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Debt Bros | Managing Debt. Saving Friendships.",
  description: "Keeping tabs of promises has never been easier...",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <AuthProvier>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </AuthProvier>
      </body>
    </html>
  )
}

