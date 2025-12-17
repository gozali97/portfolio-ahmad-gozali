import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import { IconCpu, IconServer, IconDatabase, IconCode } from "@tabler/icons-react"

export default function Profile() {
  const [techStack, setTechStack] = useState([])
  const [profile, setProfile] = useState({
    about_long: "Loading bio...",
    avatar_url: null
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data: tech } = await supabase.from('tech_stacks').select('*').order('proficiency', { ascending: false })
      const { data: prof } = await supabase.from('profile').select('*').single()
      
      if (tech) setTechStack(tech)
      if (prof) setProfile(prof)
    }
    fetchData()
  }, [])

  // Group tech by category
  const categories = {
    'language': { icon: <IconCode />, label: "Languages" },
    'framework': { icon: <IconCpu />, label: "Frameworks" },
    'database': { icon: <IconDatabase />, label: "Databases" },
    'tool': { icon: <IconServer />, label: "Tools" }
  }

  return (
    <div id="profile" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div data-aos="fade-right">
            <h4 className="text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider mb-2">About Me</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Crafting Code with Passion & Precision
            </h2>
            <div className="prose prose-lg text-gray-600 dark:text-gray-300 dark:prose-invert">
              <p className="whitespace-pre-line leading-relaxed">
                {profile.about_long}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
            <div className="space-y-4 mt-8">
              <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="text-4xl font-bold text-cyan-600 mb-2">5+</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Years of Experience</div>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Projects Delivered</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Client Satisfaction</div>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="text-4xl font-bold text-pink-600 mb-2">24/7</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Support Availability</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tech Stack</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The tools and technologies I use to bring ideas to life, always keeping up with modern standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(categories).map(catKey => {
              const catItems = techStack.filter(t => t.category === catKey)
              if (catItems.length === 0) return null
              
              return (
                <div key={catKey} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-6 text-cyan-600 dark:text-cyan-400">
                    {categories[catKey].icon}
                    <h3 className="font-bold uppercase tracking-wider text-sm">{categories[catKey].label}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {catItems.map(item => (
                      <div key={item.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.name}</span>
                          <span className="text-xs text-gray-400">{item.proficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
                            style={{ width: `${item.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
      </div>
    </div>
  )
}

