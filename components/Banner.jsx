'use client'

import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Instagram, ChevronDown } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Banner({ profile, topTech }) {
  const ref = useScrollAnimation()

  return (
    <section id="banner" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Extra blob for hero */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="container mx-auto max-w-6xl px-6 z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="scroll-hidden" data-delay="1">
              <span className="inline-block px-4 py-1.5 mb-6 rounded-full text-xs font-bold uppercase tracking-widest border border-cyan-500/20 text-cyan-400 bg-cyan-500/5">
                ✦ Available for hire
              </span>
            </div>

            <h1 className="scroll-hidden text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6" data-delay="2">
              Hi, I&apos;m <br />
              <span className="text-gradient">{profile.full_name}</span>
            </h1>

            <div className="scroll-hidden text-xl lg:text-2xl text-white/40 font-medium mb-8 h-8" data-delay="3">
              <TypeAnimation
                sequence={
                  profile.titles?.length > 0
                    ? profile.titles.flatMap((t) => [t, 2000])
                    : ['Developer', 2000]
                }
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-white/60"
              />
            </div>

            <p className="scroll-hidden text-base lg:text-lg text-white/40 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed" data-delay="4">
              {profile.about_short}
            </p>

            <div className="scroll-hidden flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5" data-delay="5">
              <a href="#contact" className="btn-primary text-center w-full sm:w-auto">
                Let&apos;s Talk
              </a>
              <div className="flex items-center gap-5">
                {profile.github_url && (
                  <a href={profile.github_url} target="_blank" rel="noreferrer"
                    className="text-white/30 hover:text-white transition-colors duration-300">
                    <Github size={24} />
                  </a>
                )}
                {profile.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" rel="noreferrer"
                    className="text-white/30 hover:text-cyan-400 transition-colors duration-300">
                    <Linkedin size={24} />
                  </a>
                )}
                {profile.instagram_url && (
                  <a href={profile.instagram_url} target="_blank" rel="noreferrer"
                    className="text-white/30 hover:text-pink-400 transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Photo + Floating Tech */}
          <div className="flex-1 flex justify-center lg:justify-end scroll-hidden" data-delay="2">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 group">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30 blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

              {/* Photo */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={profile.avatar_url || '/images/ahmad.jpg'}
                  alt={profile.full_name}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
              </div>

              {/* Floating tech badges */}
              {topTech.slice(0, 3).map((tech, idx) => {
                const positions = [
                  'absolute -top-4 -right-4 animate-float',
                  'absolute -bottom-4 -left-6 animate-float [animation-delay:1s]',
                  'absolute top-1/2 -right-8 animate-float [animation-delay:2s]',
                ]
                return (
                  <div key={idx} className={`${positions[idx]} glass rounded-xl p-2.5 shadow-xl`}>
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
                      {tech.image_url
                        ? <img src={tech.image_url} alt={tech.name} className="w-7 h-7 object-contain" />
                        : <span className="text-xs font-bold text-white/60">{tech.name.slice(0, 2)}</span>
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </section>
  )
}
