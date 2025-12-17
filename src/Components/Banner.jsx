import React, { useEffect, useState } from "react"
import { TypeAnimation } from "react-type-animation"
import { IconBrandGithub, IconBrandLinkedin, IconBrandInstagram, IconMail, IconCode } from "@tabler/icons-react"
import { supabase } from "../utils/supabaseClient"

export default function Banner() {
  const [profile, setProfile] = useState({
    full_name: "Ahmad Gozali",
    headline: "Building Digital Experiences",
    titles: ["Full Stack Developer", "Tech Enthusiast"],
    about_short: "I turn complex problems into elegant solutions.",
    avatar_url: null,
    github_url: "",
    linkedin_url: "",
    instagram_url: ""
  })
  
  const [topTech, setTopTech] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Profile
      const { data: profileData } = await supabase.from('profile').select('*').single()
      if (profileData) setProfile(profileData)

      // Fetch Top 5 Tech Stacks (sorted by proficiency)
      const { data: techData } = await supabase
        .from('tech_stacks')
        .select('name, image_url')
        .order('proficiency', { ascending: false })
        .limit(5)
      
      if (techData) setTopTech(techData)
    }
    fetchData()
  }, [])

  return (
    <div id="banner" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white dark:bg-gray-900">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-400 opacity-20 blur-[100px]"></div>

      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-wider">
                Available for hire
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Hi, I'm <br />
              <span className="text-blue-600 dark:text-cyan-400 drop-shadow-sm">
                {profile.full_name}
              </span>
            </h1>

            <div className="text-xl lg:text-2xl text-slate-600 dark:text-gray-300 font-medium mb-8 h-8">
              <TypeAnimation
                sequence={
                  profile.titles && profile.titles.length > 0 
                    ? profile.titles.flatMap(t => [t, 2000]) 
                    : ["Developer", 2000, "Creator", 2000]
                }
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            <p className="text-lg text-slate-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {profile.about_short}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#contact" className="btn-primary px-8 py-3.5 rounded-full font-semibold w-full sm:w-auto">
                Let's Talk
              </a>
              <div className="flex items-center gap-4 px-6">
                {profile.github_url && (
                  <a href={profile.github_url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                    <IconBrandGithub size={28} />
                  </a>
                )}
                {profile.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <IconBrandLinkedin size={28} />
                  </a>
                )}
                {profile.instagram_url && (
                  <a href={profile.instagram_url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors">
                    <IconBrandInstagram size={28} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Image/Avatar 3D Effect */}
          <div className="flex-1 flex justify-center lg:justify-end perspective-[1500px]">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 group transform transition-all duration-500 hover:rotate-0 rotate-y-[-12deg] rotate-x-[10deg] hover:scale-105 preserve-3d">
              
              {/* Back Layer (Shadow/Depth) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-[2rem] transform translate-z-[-20px] translate-y-4 translate-x-4 opacity-70 blur-md transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:blur-xl"></div>
              
              {/* Main Image Card */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-white/80 dark:border-white/10 shadow-2xl bg-white dark:bg-gray-800 backdrop-blur-sm">
                 <img 
                    src={profile.avatar_url || "/images/ahmad.jpg"} 
                    alt={profile.full_name} 
                    className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700"
                 />
                 {/* Glass Glare Effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Floating Tech Stack Badge */}
              <div className="absolute -bottom-8 -left-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 dark:border-gray-700 transform translate-z-[40px] animate-float">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {topTech.length > 0 ? (
                      topTech.map((tech, idx) => (
                        <div key={idx} className="relative w-10 h-10 rounded-full bg-white dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center overflow-hidden shadow-sm">
                          {tech.image_url ? (
                            <img src={tech.image_url} alt={tech.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] font-bold text-gray-500">{tech.name.slice(0,2)}</span>
                          )}
                        </div>
                      ))
                    ) : (
                      // Fallback if no tech stack data
                      [1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                          <IconCode size={16} className="text-gray-400" />
                        </div>
                      ))
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Top Skills</div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                      {topTech.length > 0 ? "Mastered" : "Loading..."}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

