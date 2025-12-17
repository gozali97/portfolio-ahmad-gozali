import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMail,
  IconMapPin,
  IconSend,
  IconMessage2
} from "@tabler/icons-react"

export default function Contact() {
  const [profile, setProfile] = useState({
    email: "contact@example.com",
    github_url: "",
    linkedin_url: "",
    instagram_url: "",
    about_short: ""
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from('profile').select('*').single()
      if (data) setProfile(data)
    }
    fetchProfile()
  }, [])

  return (
    <div id="contact" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 dark:bg-cyan-900/20 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h4 className="text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider mb-2">Get In Touch</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Let's Start a Conversation
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to discuss modern web technologies? I'm always open to new opportunities and interesting conversations.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Contact Info */}
          <div className="w-full lg:w-5/12 space-y-8" data-aos="fade-right">
            <div className="bg-slate-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm mr-4 group-hover:scale-110 transition-transform">
                    <IconMail className="text-cyan-600 dark:text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Email</h4>
                    <a href={`mailto:${profile.email}`} className="text-lg font-medium text-gray-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm mr-4 group-hover:scale-110 transition-transform">
                    <IconMapPin className="text-cyan-600 dark:text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Location</h4>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      Yogyakarta, Indonesia
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {profile.github_url && (
                    <a href={profile.github_url} target="_blank" rel="noreferrer" className="p-3 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 rounded-xl transition-all shadow-sm hover:shadow-md">
                      <IconBrandGithub size={22} />
                    </a>
                  )}
                  {profile.linkedin_url && (
                    <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="p-3 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500 rounded-xl transition-all shadow-sm hover:shadow-md">
                      <IconBrandLinkedin size={22} />
                    </a>
                  )}
                  {profile.instagram_url && (
                    <a href={profile.instagram_url} target="_blank" rel="noreferrer" className="p-3 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-white hover:bg-pink-600 dark:hover:bg-pink-500 rounded-xl transition-all shadow-sm hover:shadow-md">
                      <IconBrandInstagram size={22} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Open for opportunities</h3>
                <p className="opacity-90 mb-4">Looking for a Senior Full Stack Developer? I'm currently available for freelance projects and full-time roles.</p>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center text-sm font-bold bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Hire Me Now
                </a>
              </div>
              <IconMessage2 className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-10 rotate-12" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-7/12" data-aos="fade-left">
            <form className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all dark:text-white" placeholder="John Doe" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all dark:text-white" placeholder="john@example.com" required />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input type="text" id="subject" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all dark:text-white" placeholder="Project Inquiry" required />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea id="message" rows="5" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all dark:text-white resize-none" placeholder="Tell me about your project..." required></textarea>
              </div>

              <button type="submit" className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                <IconSend size={20} />
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
