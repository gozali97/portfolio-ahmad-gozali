export default function Footer({ profile }) {
  const currentYear = new Date().getFullYear()

  const links = [
    { label: 'Index', href: '#banner' },
    { label: 'About', href: '#profile' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Activity', href: '#activity' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="rule-t">
      <div className="mx-auto max-w-editorial px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="display text-2xl mb-1">{profile.full_name}</div>
            <p className="mono-label text-ink/40">Full Stack Developer</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="mono-label text-ink/50 hover:text-accent transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mt-12 pt-6 rule-t">
          <p className="mono-label text-ink/40">© {currentYear} {profile.full_name}</p>
          <p className="mono-label text-ink/40">Designed & built in Yogyakarta · 2025</p>
        </div>
      </div>
    </footer>
  )
}
