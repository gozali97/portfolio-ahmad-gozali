import { siteConfig } from '@/lib/siteConfig'

/**
 * JSON-LD structured data (schema.org).
 * Emits a Person + WebSite graph so Google understands who this site is about.
 * This strongly helps ranking for personal-name queries like "Ahmad Gozali".
 */
export default function StructuredData({ profile, projects = [] }) {
  const sameAs = [profile.github_url, profile.linkedin_url, profile.instagram_url].filter(Boolean)

  const person = {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: profile.full_name,
    alternateName: ['Ahmad Gozali IT', 'Ahmad Gozali Developer'],
    url: siteConfig.url,
    image: `${siteConfig.url}${profile.avatar_url || '/images/ahmad.jpg'}`,
    jobTitle: 'Full Stack Developer',
    description: profile.about_short,
    email: profile.email ? `mailto:${profile.email}` : undefined,
    knowsAbout: [
      'Full Stack Development',
      'Laravel',
      'PHP',
      'React',
      'Vue.js',
      'Next.js',
      'Node.js',
      'NestJS',
      'MySQL',
      'PostgreSQL',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Yogyakarta',
      addressCountry: 'ID',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'PT K-24 Indonesia',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universitas Teknologi Yogyakarta',
    },
    sameAs,
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: 'en',
    publisher: { '@id': `${siteConfig.url}/#person` },
  }

  const profilePage = {
    '@type': 'ProfilePage',
    '@id': `${siteConfig.url}/#webpage`,
    url: siteConfig.url,
    name: siteConfig.title,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#person` },
    inLanguage: 'en',
  }

  // Showcase projects as creative works (helps "Ahmad Gozali portfolio/projects").
  const creativeWorks = projects.slice(0, 8).map((p) => ({
    '@type': 'CreativeWork',
    name: p.title,
    description: p.short_description,
    url: p.demo_url || p.repo_url || siteConfig.url,
    creator: { '@id': `${siteConfig.url}/#person` },
  }))

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [person, website, profilePage, ...creativeWorks],
  }

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be injected as raw JSON.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
