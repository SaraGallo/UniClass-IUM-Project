import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UniClass - Università degli Studi di Salerno",
  description: "Piattaforma gestionale accademica centralizzata per l'Università di Salerno",
  keywords: "università, salerno, gestione, orari, avvisi, studenti, docenti",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
