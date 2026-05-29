import { Plus_Jakarta_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeToggle from '@/components/ThemeToggle'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata = {
  title: 'Ahmad Gozali — Full Stack Developer',
  description: 'Personal portfolio of Ahmad Gozali — Full Stack Developer specializing in modern web technologies.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'Laravel', 'Portfolio'],
  authors: [{ name: 'Ahmad Gozali' }],
  openGraph: {
    title: 'Ahmad Gozali — Full Stack Developer',
    description: 'Building digital experiences with passion and precision.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" suppressHydrationWarning>
        <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
          <ThemeProvider>
            {children}
            <ThemeToggle />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
