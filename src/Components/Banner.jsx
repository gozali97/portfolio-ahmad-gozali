import React from "react"
import { TypeAnimation } from "react-type-animation"
import { IconCode, IconDatabase, IconDeviceDesktop } from "@tabler/icons-react"

export default function Banner() {
  return (
    <div id="banner" className="section flex justify-center pt-24 lg:pt-32">
      <section className="relative w-full py-12 sm:py-16 lg:pt-20 xl:pb-0">
        {/* Background gradient elements */}
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl"></div>
        <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl"></div>

        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h4 className="text-md font-semibold text-indigo-400 mb-2">
              SENIOR DEVELOPER WITH 5+ YEARS EXPERIENCE
            </h4>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ahmad Gozali
            </h1>
            <div className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-8 h-16 flex items-center justify-center">
              <span className="mr-3">I'm a</span>
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2000,
                  "Frontend Specialist",
                  2000,
                  "Laravel Expert",
                  2000,
                  "Solution Architect",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500"
                repeat={Infinity}
              />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-gray-300 font-light">
              A senior full-stack developer with extensive experience in
              building scalable web applications. I specialize in Laravel,
              React, and Vue.js development with a proven track record of
              delivering enterprise-grade solutions for diverse business needs.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
              >
                Contact Me
              </a>
              <a
                href="#portofolio"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-600 transition-all duration-300"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="300"
          className="mt-24 mb-16 mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4"
        >
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-indigo-600/20 rounded-lg mr-4">
                <IconDeviceDesktop size="28" className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Frontend Expert
              </h3>
            </div>
            <p className="text-gray-300">
              Specialized in building responsive, performant UIs with React.js
              and Vue.js, focusing on component architecture and state
              management.
            </p>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-indigo-600/20 rounded-lg mr-4">
                <IconCode size="28" className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Backend Developer
              </h3>
            </div>
            <p className="text-gray-300">
              Expert in building robust backend systems with Laravel and
              CodeIgniter, implementing clean architecture and RESTful API
              design.
            </p>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-indigo-600/20 rounded-lg mr-4">
                <IconDatabase size="28" className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Database Architect
              </h3>
            </div>
            <p className="text-gray-300">
              Skilled in database design, optimization, and management using
              MySQL and PostgreSQL for high-performance applications.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
