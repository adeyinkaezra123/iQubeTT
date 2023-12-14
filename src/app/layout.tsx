import type { Metadata } from 'next'
import './globals.css'
import { ProductFont } from '@/components/ui/fonts'
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper'
export const metadata: Metadata = {
  title: 'iQube TT Portal',
  description: 'Generated by create next app',
  authors: [{ name: 'Ezra Adeyinka' }]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ProductFont.className}>
        <BackgroundWrapper>
          {children}
        </BackgroundWrapper>
      </body>
    </html>
  )
}
