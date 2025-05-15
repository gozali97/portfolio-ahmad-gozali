import React from "react"
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
  IconPhone,
  IconSend,
} from "@tabler/icons-react"

export default function Contact() {
  return (
    <div id="contact" className="section py-24 bg-gray-900">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h4
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-indigo-400 text-sm uppercase font-semibold tracking-wider mb-2"
          >
            Get In Touch
          </h4>
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Contact Me
          </h2>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            className="w-24 h-1 bg-indigo-500 mx-auto mb-8 rounded-full"
          ></div>
          <p
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            className="text-gray-300 max-w-2xl mx-auto mb-10"
          >
            I'm currently available for freelance work and full-time full stack
            developer positions. If you're looking for a developer with
            extensive experience in building scalable web applications, let's
            discuss how I can contribute to your project or team.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact information */}
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="w-full lg:w-1/3"
          >
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-xl h-full">
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-indigo-600/20 rounded-lg mr-4">
                    <IconMapPin size={24} className="text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Location</h4>
                    <p className="text-gray-400">Yogyakarta, Indonesia</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-indigo-600/20 rounded-lg mr-4">
                    <IconMail size={24} className="text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email</h4>
                    <a
                      href="mailto:ahmadmulti10@gmail.com"
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                    >
                      ahmadmulti10@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-indigo-600/20 rounded-lg mr-4">
                    <IconPhone size={24} className="text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Phone</h4>
                    <a
                      href="tel:+6281234567890"
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                    >
                      +62 822 9634 6899
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="text-white font-medium mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/gozali97"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-700 hover:bg-indigo-600 text-white rounded-full transition-colors duration-300"
                  >
                    <IconBrandGithub size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ahmad-gozali/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-700 hover:bg-indigo-600 text-white rounded-full transition-colors duration-300"
                  >
                    <IconBrandLinkedin size={20} />
                  </a>
                </div>
              </div>

              <div className="mt-10 p-6 bg-indigo-600/10 rounded-lg border border-indigo-500/20">
                <h4 className="text-white font-medium mb-2">Available For</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                    Full Stack Developer Positions
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                    Freelance Project Work
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                    Technical Consultation
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            className="w-full lg:w-2/3"
          >
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send Me a Message
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-300"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                    placeholder="Project Inquiry / Job Opportunity"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                    placeholder="Describe your project or job opportunity in detail..."
                    required
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 text-indigo-600"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                    I agree to the{" "}
                    <a
                      href="/privacy-policy"
                      className="text-indigo-400 hover:underline"
                    >
                      privacy policy
                    </a>{" "}
                    and consent to being contacted regarding my inquiry.
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center"
                >
                  <IconSend size={18} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
