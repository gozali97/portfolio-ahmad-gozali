import React, { useState, useEffect } from "react"
import { IconMenu2, IconX, IconCode } from "@tabler/icons-react"
import { Link } from "react-scroll"
import ThemeToggle from "./ThemeToggle"
import { supabase } from "../utils/supabaseClient"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resumeUrl, setResumeUrl] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)

    // Fetch Resume URL
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profile")
        .select("resume_url")
        .single()
      if (data?.resume_url) setResumeUrl(data.resume_url)
    }
    fetchProfile()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { to: "banner", label: "Home" },
    { to: "profile", label: "About" },
    { to: "portofolio", label: "Work" },
    { to: "contact", label: "Contact" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled
            ? "bg-white dark:bg-gray-900 shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center max-w-full">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Ahmad
              <span className="text-cyan-600 dark:text-cyan-400">.Gozali</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors"
                activeClass="text-cyan-600 dark:text-cyan-400 font-semibold"
              >
                {item.label}
              </Link>
            ))}

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            <ThemeToggle />

            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-gray-100 transition-all hover:scale-105"
              >
                Resume
              </a>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <IconX /> : <IconMenu2 />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-medium text-gray-800 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full text-lg font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900"
            >
              Download Resume
            </a>
          )}
        </div>
      </div>
    </>
  )
}
