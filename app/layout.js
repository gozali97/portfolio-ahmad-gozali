import { Plus_Jakarta_Sans, Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeToggle from '@/components/ThemeToggle'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
      <html lang="en" className="light" suppressHydrationWarning>
        <body className={`${plusJakartaSans.variable} ${bricolage.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
          <ThemeProvider>
            {children}
            <ThemeToggle />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
