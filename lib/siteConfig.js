/**
 * Central site configuration used for SEO (metadata, sitemap, robots, JSON-LD).
 * Override the production URL with NEXT_PUBLIC_SITE_URL in your environment
 * (e.g. set it to your custom domain in Vercel project settings).
 */
export const siteConfig = {
  name: 'Ahmad Gozali',
  // Primary production domain. Override with NEXT_PUBLIC_SITE_URL if needed.
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://profile.ahmad-gozali.com').replace(/\/$/, ''),
  title: 'Ahmad Gozali — Full Stack Developer & Laravel Engineer',
  shortTitle: 'Ahmad Gozali',
  description:
    'Ahmad Gozali is a Full Stack Developer and Laravel Engineer from Yogyakarta, Indonesia, building scalable web applications with Laravel, React, Vue, and Next.js. View portfolio, projects, and experience.',
  locale: 'en_US',
  localeAlt: 'id_ID',
  ogImage: '/images/ahmad.jpg',
  twitter: '',
  keywords: [
    'Ahmad Gozali',
    'Ahmad Gozali IT',
    'Ahmad Gozali portfolio',
    'Ahmad Gozali developer',
    'Ahmad Gozali Full Stack Developer',
    'Ahmad Gozali Laravel',
    'Ahmad Gozali Yogyakarta',
    'Full Stack Developer Indonesia',
    'Laravel Developer Yogyakarta',
    'React Developer Indonesia',
    'Web Developer Yogyakarta',
  ],
}
