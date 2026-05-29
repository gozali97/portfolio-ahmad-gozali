'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Profile({ profile, techStacksByCategory }) {
  const ref = useScrollAnimation()

  const stats = [
    { value: '5+', label: 'Years Experience', color: 'from-cyan-500 to-blue-500' },
    { value: '20+', label: 'Projects Delivered', color: 'from-blue-500 to-purple-500' },
    { value: '100%', label: 'Client Satisfaction', color: 'from-purple-500 to-pink-500' },
    { value: '24/7', label: 'Support Available', color: 'from-pink-500 to-cyan-500' },
  ]

  const allTech = [
    ...(techStacksByCategory.language || []),
    ...(techStacksByCategory.framework || []),
    ...(techStacksByCategory.database || []),
    ...(techStacksByCategory.tool || []),
  ]

  return (
    <section id="profile" className="py-24" ref={ref}>
      <div className="container mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="text-center mb-16 scroll-hidden">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">About Me</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Crafting Code with <br className="hidden sm:block" />
            <span className="text-gradient">Passion & Precision</span>
          </h2>
        </div>

        {/* Bio + Stats Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-20">
          {/* Bio - spans 3 columns */}
          <div className="lg:col-span-3 glass rounded-2xl p-8 scroll-hidden" data-delay="1">
            <p className="text-white/50 leading-relaxed text-lg whitespace-pre-line">
              {profile.about_long}
            </p>
          </div>

          {/* Stats - 2x2 grid spanning 2 columns */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="glass glass-hover rounded-2xl p-6 flex flex-col justify-center text-center scroll-hidden" data-delay={idx + 2}>
                <div className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-xs text-white/30 mt-2 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack - Logo Cards */}
        <div className="scroll-hidden">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Tech Stack</h3>
            <p className="text-white/30 text-sm">Technologies I work with daily</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {allTech.map((tech, idx) => (
              <div key={tech.id}
                className="glass glass-hover rounded-2xl p-4 flex flex-col items-center gap-3 group cursor-default scroll-hidden"
                data-delay={Math.min(idx + 1, 6)}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  {tech.image_url
                    ? <img src={tech.image_url} alt={tech.name} className="w-8 h-8 object-contain" />
                    : <span className="text-sm font-bold text-white/40">{tech.name.slice(0, 2)}</span>
                  }
                </div>
                <span className="text-xs font-medium text-white/40 group-hover:text-white/70 transition-colors text-center leading-tight">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
