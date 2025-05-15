import React from "react"
import { Link } from "react-scroll"
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandTwitter,
  IconCode,
  IconDownload,
  IconMail,
} from "@tabler/icons-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800/90 pt-16 pb-8 border-t border-gray-700">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Top section with logo, nav, and social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand and intro */}
          <div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-indigo-600/20 rounded-lg mr-3">
                <IconCode size={24} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Ahmad Gozali</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Senior Full Stack Developer specializing in Laravel, React, and
              Vue.js with 5+ years of professional experience building
              enterprise applications.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/gozali97"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-indigo-600 text-white rounded-full transition-colors duration-300"
                aria-label="GitHub"
              >
                <IconBrandGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/ahmad-gozali"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-indigo-600 text-white rounded-full transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin size={18} />
              </a>
              <a
                href="https://instagram.com/agozalii"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-indigo-600 text-white rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <IconBrandInstagram size={18} />
              </a>
              <a
                href="https://twitter.com/tylerzall"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-indigo-600 text-white rounded-full transition-colors duration-300"
                aria-label="Twitter"
              >
                <IconBrandTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-3">
              <Link
                to="banner"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                activeClass="text-indigo-400"
                className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 cursor-pointer w-fit"
              >
                Home
              </Link>
              <Link
                to="profile"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                activeClass="text-indigo-400"
                className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 cursor-pointer w-fit"
              >
                About Me
              </Link>
              <Link
                to="portofolio"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                activeClass="text-indigo-400"
                className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 cursor-pointer w-fit"
              >
                Portfolio
              </Link>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                activeClass="text-indigo-400"
                className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 cursor-pointer w-fit"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact and resume */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">
              Get In Touch
            </h4>
            <div className="flex items-center mb-3">
              <IconMail size={18} className="text-indigo-400 mr-2" />
              <a
                href="mailto:ahmadmulti10@gmail.com"
                className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
              >
                ahmadmulti10@gmail.com
              </a>
            </div>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300"
              >
                <IconDownload size={18} className="mr-2" />
                Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700 my-8"></div>

        {/* Bottom section with copyright and credits */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Ahmad Gozali. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <p>Senior Full Stack Developer | Laravel & React Expert</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
