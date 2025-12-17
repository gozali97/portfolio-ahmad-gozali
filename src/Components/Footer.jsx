import React, { useEffect, useState } from "react"
import { Link } from "react-scroll"
import { supabase } from "../utils/supabaseClient"
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconCode,
  IconDownload,
  IconMail,
} from "@tabler/icons-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [profile, setProfile] = useState({
    full_name: "Ahmad Gozali",
    email: "contact@example.com",
    github_url: "",
    linkedin_url: "",
    instagram_url: "",
    resume_url: ""
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from('profile').select('*').single()
      if (data) setProfile(data)
    }
    fetchProfile()
  }, [])

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-16 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Top section with logo, nav, and social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand and intro */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg text-white">
                <IconCode size={24} />
              </div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                {profile.full_name}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Full Stack Developer specializing in modern web technologies. Building digital products with passion and precision.
            </p>
            <div className="flex space-x-3">
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-100 dark:bg-gray-800 hover:bg-cyan-600 dark:hover:bg-cyan-600 hover:text-white text-gray-600 dark:text-gray-400 rounded-lg transition-all duration-300"
                  aria-label="GitHub"
                >
                  <IconBrandGithub size={20} />
                </a>
              )}
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-100 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-gray-600 dark:text-gray-400 rounded-lg transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <IconBrandLinkedin size={20} />
                </a>
              )}
              {profile.instagram_url && (
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-100 dark:bg-gray-800 hover:bg-pink-600 dark:hover:bg-pink-600 hover:text-white text-gray-600 dark:text-gray-400 rounded-lg transition-all duration-300"
                  aria-label="Instagram"
                >
                  <IconBrandInstagram size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-lg">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-3">
              {['Home', 'About', 'Portfolio', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={item.toLowerCase() === 'home' ? 'banner' : item === 'Portfolio' ? 'portofolio' : item === 'About' ? 'profile' : item.toLowerCase()}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer w-fit font-medium"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact and resume */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-lg">
              Get In Touch
            </h4>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4 group">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                 <IconMail size={18} />
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
              >
                {profile.email}
              </a>
            </div>
            
            {profile.resume_url && (
              <div className="mt-6">
                <a
                  href={profile.resume_url}
                  className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl transition-all shadow-lg hover:shadow-xl font-bold text-sm"
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconDownload size={18} className="mr-2" />
                  Download Resume
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-500 text-sm">
          <p>&copy; {currentYear} {profile.full_name}. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-6">
             <span>Privacy Policy</span>
             <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
