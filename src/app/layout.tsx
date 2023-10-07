import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import generateMetadata from '@/lib/metadata'

import '@/assets/styles/globals.css'
import LayoutClient from '@/components/parts/LayoutClient'
import Navbar from '@/components/parts/Navbar'
import Providers from '@/components/parts/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />

          {children}

        <LayoutClient />
      </Providers>
      </body>
    </html>
  )
}
