import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UniClass - Università degli Studi di Salerno",
  description: "Piattaforma gestionale accademica centralizzata per l'Università di Salerno",
  keywords: "università, salerno, gestione, orari, avvisi, studenti, docenti",
  authors: [{ name: "Team UniClass" }],
  creator: "Università degli Studi di Salerno",
  publisher: "UniClass Development Team",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3b82f6",
  openGraph: {
    title: "UniClass - Università degli Studi di Salerno",
    description: "Piattaforma gestionale accademica centralizzata per l'Università di Salerno",
    type: "website",
    locale: "it_IT",
    siteName: "UniClass",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniClass - Università degli Studi di Salerno",
    description: "Piattaforma gestionale accademica centralizzata per l'Università di Salerno",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="application-name" content="UniClass" />
        <meta name="apple-mobile-web-app-title" content="UniClass" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
