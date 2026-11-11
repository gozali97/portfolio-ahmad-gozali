import localFont from 'next/font/local'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeToggle from '@/components/ThemeToggle'
import { siteConfig } from '@/lib/siteConfig'
import './globals.css'

// Satoshi by Indian Type Foundry (Fontshare, ITF Free Font License)
const satoshi = localFont({
  src: './fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  weight: '300 900',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s — Ahmad Gozali',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'Ahmad Gozali', url: siteConfig.url }],
  creator: 'Ahmad Gozali',
  publisher: 'Ahmad Gozali',
  applicationName: 'Ahmad Gozali Portfolio',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    alternateLocale: siteConfig.localeAlt,
    url: siteConfig.url,
    siteName: 'Ahmad Gozali — Portfolio',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 1200,
        alt: 'Ahmad Gozali — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-app.jpg',
  },
  // After you verify the site in Google Search Console, paste the token here
  // or set NEXT_PUBLIC_GOOGLE_VERIFICATION in your environment.
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="light" suppressHydrationWarning>
        <body className={`${satoshi.variable} font-sans antialiased`}>
          <ThemeProvider>
            {children}
            <ThemeToggle />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
