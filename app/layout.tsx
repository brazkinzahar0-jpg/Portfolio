import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-clash',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: true,
})

export const metadata: Metadata = {
  title: 'Portfolio | Creative Developer',
  description: 'Premium portfolio showcasing digital experiences and creative solutions',
  keywords: ['portfolio', 'designer', 'developer', 'creative'],
  authors: [{ name: 'Your Name' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Portfolio | Creative Developer',
    description: 'Premium portfolio showcasing digital experiences and creative solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Creative Developer',
    description: 'Premium portfolio showcasing digital experiences and creative solutions',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-dark-primary text-white overflow-x-hidden`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}

