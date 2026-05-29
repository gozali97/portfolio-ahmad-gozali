import { Github, Linkedin, Instagram, Code, Mail } from 'lucide-react'

export default function Footer({ profile }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 mt-12">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Code size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold">{profile.full_name}</span>
            </div>
            <p className="text-sm text-white/30">Building digital experiences with precision.</p>
          </div>

          {/* Links */}
          <nav className="flex gap-8">
            {['Home', 'About', 'Work', 'Contact'].map((label) => (
              <a key={label} href={`#${label === 'Home' ? 'banner' : label === 'About' ? 'profile' : label === 'Work' ? 'portfolio' : 'contact'}`}
                className="text-sm text-white/30 hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            {profile.github_url && (
              <a href={profile.github_url} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all" aria-label="GitHub">
                <Github size={16} />
              </a>
            )}
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all" aria-label="Email">
                <Mail size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="section-divider mt-8 mb-6" />
        <p className="text-center text-xs text-white/20">&copy; {currentYear} {profile.full_name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
