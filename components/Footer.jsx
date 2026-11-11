const LINKS = [
  { label: 'About', href: '#profile' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Activity', href: '#activity' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer({ profile }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-night text-on-night">
      <div className="mx-auto flex max-w-site flex-col gap-6 border-t border-on-night/10 px-6 pb-24 pt-10 md:flex-row md:items-center md:justify-between md:px-8 md:pb-10 md:pr-24">
        <p className="text-sm text-on-night/50">
          © {year} {profile?.full_name || 'Ahmad Gozali'}. All rights reserved.
        </p>
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-on-night/60 transition-colors hover:text-on-night">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
