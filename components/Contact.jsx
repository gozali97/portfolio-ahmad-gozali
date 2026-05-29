'use client'

import { Github, Linkedin, Instagram, Mail, MapPin, Send, MessageCircle } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Contact({ profile }) {
  const ref = useScrollAnimation()

  return (
    <section id="contact" className="py-24" ref={ref}>
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-16 scroll-hidden">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Let&apos;s Start a <span className="text-gradient">Conversation</span>
          </h2>
          <p className="text-white/30 max-w-xl mx-auto">Have a project in mind? I&apos;m always open to new opportunities.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass rounded-2xl p-6 scroll-hidden" data-delay="1">
              <h3 className="font-bold text-white mb-5">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                    <Mail size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Email</div>
                    <a href={`mailto:${profile.email}`} className="text-sm font-medium text-white/70 hover:text-white transition-colors">{profile.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                    <MapPin size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Location</div>
                    <span className="text-sm font-medium text-white/70">Yogyakarta, Indonesia</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Follow</div>
                <div className="flex gap-3">
                  {[
                    { url: profile.github_url, Icon: Github, hover: 'hover:bg-white hover:text-black' },
                    { url: profile.linkedin_url, Icon: Linkedin, hover: 'hover:bg-blue-600 hover:text-white' },
                    { url: profile.instagram_url, Icon: Instagram, hover: 'hover:bg-pink-600 hover:text-white' },
                  ].map(({ url, Icon, hover }) => url && (
                    <a key={url} href={url} target="_blank" rel="noreferrer"
                      className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 ${hover} transition-all duration-300`}>
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="relative glass rounded-2xl p-6 overflow-hidden scroll-hidden" data-delay="2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10" />
              <div className="relative">
                <h3 className="font-bold text-white mb-2">Open for opportunities</h3>
                <p className="text-white/40 text-sm mb-4">Currently available for freelance and full-time roles.</p>
                <a href={`mailto:${profile.email}`}
                  className="inline-flex items-center text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
                  Hire Me Now →
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 glass rounded-2xl p-8 scroll-hidden" data-delay="3">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-white/30 uppercase tracking-wider mb-2">Name</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white placeholder-white/20 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email-input" className="block text-xs font-medium text-white/30 uppercase tracking-wider mb-2">Email</label>
                  <input type="email" id="email-input" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white placeholder-white/20 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="subject" className="block text-xs font-medium text-white/30 uppercase tracking-wider mb-2">Subject</label>
                <input type="text" id="subject" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white placeholder-white/20 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all" placeholder="Project Inquiry" />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-xs font-medium text-white/30 uppercase tracking-wider mb-2">Message</label>
                <textarea id="message" rows="5" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white placeholder-white/20 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all resize-none" placeholder="Tell me about your project..." />
              </div>
              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 rounded-xl">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
