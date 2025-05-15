import React, { useState } from "react"
import {
  IconBrandGithub,
  IconExternalLink,
  IconBrandLaravel,
  IconBrandReact,
  IconBrandVue,
  IconLayoutGrid,
  IconDeviceLaptop,
  IconServer,
  IconStack,
  IconMail,
} from "@tabler/icons-react"

export default function Portfolio() {
  // State for filtering projects
  const [filter, setFilter] = useState("all")

  // Enhanced project data with more professional details and live links
  const projects = [
    {
      id: 0,
      name: "K-24 Pharmacy Franchise Portal",
      shortDesc: "Franchise management and inquiry system for K-24 Pharmacy",
      fullDesc:
        "Developed a comprehensive franchise management portal for PT Apotek K-24 Indonesia with inquiry forms, franchise information, and operational support.",
      image: "/images/k24-franchise.png",
      technologies: ["Laravel", "jQuery", "MySQL", "Bootstrap", "PHP"],
      category: "fullstack",
      highlights: [
        "Implemented franchise application and inquiry system",
        "Built secure admin dashboard for franchise management",
        "Integrated with K-24 operational systems",
        "Created responsive design for all device types",
      ],
      demoLink: "https://webform.apotek-k24.com",
      codeLink: "https://github.com/gozali97",
      isLive: true,
    },
    {
      id: 1,
      name: "Genilogi Assessment Platform",
      shortDesc: "Psychology assessment and testing platform",
      fullDesc:
        "Developed a sophisticated platform for psychological assessments with result analysis and reporting capabilities.",
      image: "/images/genilogi.png",
      technologies: ["Laravel 9", "Vue.js", "MySQL", "Chart.js", "TailwindCSS"],
      category: "fullstack",
      highlights: [
        "Implemented complex assessment algorithms",
        "Built detailed result visualization dashboards",
        "Developed secure PDF report generation",
        "Created comprehensive user progress tracking",
      ],
      demoLink: "https://genilogi.id",
      codeLink: "https://github.com/gozali97",
      isLive: true,
    },
    {
      id: 2,
      name: "Digimoon Digital Agency",
      shortDesc: "Digital marketing and web development agency platform",
      fullDesc:
        "Architected and developed a comprehensive digital agency platform showcasing services, portfolio, and client management system.",
      image: "/images/digimoon.png",
      technologies: ["Laravel", "Vue.js", "MySQL", "TailwindCSS", "Alpine.js"],
      category: "fullstack",
      highlights: [
        "Implemented responsive design with modern UI/UX principles",
        "Built custom CMS for portfolio management",
        "Integrated client project management system",
        "Optimized for performance and SEO",
      ],
      demoLink: "https://digimoon.id",
      codeLink: "https://github.com/gozali97",
      isLive: true,
    },
    {
      id: 3,
      name: "KLC Learning Center",
      shortDesc: "E-learning platform for corporate training",
      fullDesc:
        "Architected a comprehensive learning management system for corporate training and skill development at PT Apotek K-24.",
      image: "/images/klc.png",
      technologies: ["Laravel 9", "Vue.js", "MySQL", "AWS S3", "Redis"],
      category: "fullstack",
      highlights: [
        "Implemented video streaming integration with AWS",
        "Developed interactive course materials and quizzes",
        "Built progress tracking and certification system",
        "Created analytics dashboard for administrators",
      ],
      demoLink: "https://klc.k24.co.id",
      codeLink: "https://github.com/gozali97",
      isLive: true,
    },
    {
      id: 4,
      name: "Digital Panel Dashboard",
      shortDesc: "Enterprise management dashboard for digital services",
      fullDesc:
        "Designed and developed a comprehensive dashboard for managing digital services, analytics, and client reporting.",
      image: "/images/digital-panel.png",
      technologies: ["Laravel 10", "React", "MySQL", "Redis", "TailwindCSS"],
      category: "fullstack",
      highlights: [
        "Built real-time data visualization with React",
        "Implemented role-based access control system",
        "Developed automated reporting features",
        "Created API integration with multiple services",
      ],
      demoLink: "https://digitalpanel.id",
      codeLink: "https://github.com/gozali97",
      isLive: true,
    },
    {
      id: 5,
      name: "BuatinSoal Quiz Generator",
      shortDesc: "AI-powered quiz and assessment generator",
      fullDesc:
        "Developed an innovative platform that leverages AI to generate customized quizzes and assessments for educational purposes.",
      image: "/images/buatin-soal.png",
      technologies: ["Next.js", "React", "Vercel", "OpenAI API", "TailwindCSS"],
      category: "frontend",
      highlights: [
        "Integrated OpenAI API for intelligent question generation",
        "Built adaptive difficulty system based on user performance",
        "Implemented real-time collaboration features",
        "Developed comprehensive analytics for educators",
      ],
      demoLink: "https://buatinsoal-eight.vercel.app",
      codeLink: "https://github.com/gozali97",
      isLive: true,
    },
    {
      id: 6,
      name: "ChattingAja Messaging App",
      shortDesc: "Real-time messaging application with modern features",
      fullDesc:
        "Built a feature-rich real-time messaging platform with end-to-end encryption, file sharing, and group chat capabilities.",
      image: "/images/chatting-aja.png",
      technologies: [
        "Next.js",
        "Socket.io",
        "MongoDB",
        "Firebase",
        "TailwindCSS",
      ],
      category: "fullstack",
      highlights: [
        "Implemented real-time messaging with Socket.io",
        "Built end-to-end encryption for secure communications",
        "Developed file sharing and media preview features",
        "Created responsive UI for all device types",
      ],
      demoLink: "https://chattingaja.vercel.app",
      codeLink: "https://github.com/gozali97",
      isLive: true,
    },
    {
      id: 7,
      name: "Book Store E-commerce",
      shortDesc: "Full-featured e-commerce platform for books",
      fullDesc:
        "Developed a comprehensive e-commerce platform with advanced search, recommendation engine, and secure payment processing.",
      image: "/images/bookstore.png",
      technologies: ["Laravel", "Inertia.js", "React", "MySQL", "Stripe API"],
      category: "fullstack",
      highlights: [
        "Implemented real-time inventory management",
        "Integrated payment gateway with Stripe",
        "Built responsive UI with React components",
        "Optimized database queries for performance",
      ],
      demoLink: "#",
      codeLink: "https://github.com/gozali97",
      isLive: false,
    },
    {
      id: 8,
      name: "Laboratory Information System",
      shortDesc: "Enterprise lab management solution",
      fullDesc:
        "Designed and implemented a comprehensive laboratory information system for managing samples, tests, and results.",
      image: "/images/lis.png",
      technologies: ["Laravel 9", "jQuery", "MySQL", "Bootstrap", "FPDF"],
      category: "backend",
      highlights: [
        "Implemented barcode integration for sample tracking",
        "Built automated result validation workflows",
        "Developed integration with laboratory equipment",
        "Created comprehensive reporting system",
      ],
      demoLink: "#",
      codeLink: "https://github.com/gozali97",
      isLive: false,
    },
  ]

  // Filter projects based on selected category
  const filteredProjects =
    filter === "all"
      ? projects
      : filter === "live"
      ? projects.filter((project) => project.isLive)
      : projects.filter((project) => project.category === filter)

  // Function to render technology badge with appropriate icon
  const renderTechBadge = (tech) => {
    let icon = null
    if (tech.includes("Laravel")) {
      icon = <IconBrandLaravel size={16} className="mr-1" />
    } else if (tech.includes("React")) {
      icon = <IconBrandReact size={16} className="mr-1" />
    } else if (tech.includes("Vue")) {
      icon = <IconBrandVue size={16} className="mr-1" />
    }

    return (
      <span
        key={tech}
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-indigo-300 border border-gray-700 mr-2 mb-2"
      >
        {icon}
        {tech}
      </span>
    )
  }

  return (
    <div id="portofolio" className="py-10 bg-gray-900">
      <div className="container mx-auto max-w-[1200px] px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h4
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-indigo-400 text-sm uppercase font-semibold tracking-wider mb-2"
          >
            Featured Projects
          </h4>
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            My Professional Work
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
            className="text-gray-300 max-w-2xl mx-auto mb-6"
          >
            I'm currently working at PT Apotek K-24 in Yogyakarta, Indonesia,
            where I develop enterprise-grade applications. Below are some of my
            notable projects showcasing my expertise in full-stack development.
          </p>

          {/* Featured Live Projects Section */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
            className="mb-16 mt-8 py-8 px-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              Featured Live Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects
                .filter((p) => p.isLive)
                .map((project) => (
                  <a
                    key={project.id}
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col px-4 py-3 bg-gray-800/90 rounded-lg border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 group hover:bg-gray-800 hover:shadow-lg"
                  >
                    <div className="flex items-center mb-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      <span className="text-white font-medium truncate">
                        {project.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 group-hover:text-indigo-400 transition-colors duration-300 truncate max-w-[80%]">
                        {project.demoLink.replace("https://", "")}
                      </span>
                      <IconExternalLink
                        size={16}
                        className="text-indigo-400 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
                      />
                    </div>
                  </a>
                ))}
            </div>
          </div>

          {/* Filter buttons */}
          <div
            className="flex flex-wrap justify-center gap-3 mb-10 mt-2"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 font-medium flex items-center ${
                filter === "all"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-105"
                  : "bg-gray-800/80 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              <IconLayoutGrid size={18} className="mr-2" />
              All Projects
            </button>
            <button
              onClick={() => setFilter("frontend")}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 font-medium flex items-center ${
                filter === "frontend"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-105"
                  : "bg-gray-800/80 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              <IconDeviceLaptop size={18} className="mr-2" />
              Frontend
            </button>
            <button
              onClick={() => setFilter("backend")}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 font-medium flex items-center ${
                filter === "backend"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-105"
                  : "bg-gray-800/80 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              <IconServer size={18} className="mr-2" />
              Backend
            </button>
            <button
              onClick={() => setFilter("fullstack")}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 font-medium flex items-center ${
                filter === "fullstack"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-105"
                  : "bg-gray-800/80 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              <IconStack size={18} className="mr-2" />
              Full Stack
            </button>
            <button
              onClick={() => setFilter("live")}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 font-medium flex items-center ${
                filter === "live"
                  ? "bg-green-600 text-white shadow-lg shadow-green-500/20 scale-105"
                  : "bg-gray-800/80 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Live Projects
            </button>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={`${(project.id % 3) * 100}`}
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 group shadow-xl hover:shadow-indigo-500/10 flex flex-col h-full"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                {project.isLive && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-900/70 text-green-400 border border-green-700">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                      Live
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300 line-clamp-1">
                  {project.name}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {project.shortDesc}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies
                    .slice(0, 3)
                    .map((tech) => renderTechBadge(tech))}
                  {project.technologies.length > 3 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4 flex-grow">
                  {project.highlights.slice(0, 2).map((highlight, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-2"></div>
                      <p className="text-sm text-gray-400 line-clamp-1">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-700">
                  <div className="flex items-center">
                    <div className="text-xs text-gray-500">
                      {project.category === "frontend" && "Frontend"}
                      {project.category === "backend" && "Backend"}
                      {project.category === "fullstack" && "Full Stack"}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300 p-1.5 hover:bg-gray-700 rounded-full"
                      title="View Code Repository"
                      aria-label="View Code Repository"
                    >
                      <IconBrandGithub size={16} />
                    </a>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        project.isLive
                          ? "text-indigo-400 hover:text-indigo-300"
                          : "text-gray-400 hover:text-white"
                      } transition-colors duration-300 p-1.5 hover:bg-gray-700 rounded-full`}
                      title={
                        project.isLive
                          ? "Visit Live Project"
                          : "Demo Not Available"
                      }
                      aria-label={
                        project.isLive
                          ? "Visit Live Project"
                          : "Demo Not Available"
                      }
                    >
                      <IconExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats and current position */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="mt-24 mb-12 bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="p-8 lg:w-1/2 lg:border-r border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">
                Current Position
              </h3>
              <p className="text-gray-300 mb-4">
                Full Stack Developer at{" "}
                <span className="text-indigo-400 font-medium">
                  PT Apotek K-24
                </span>
                , Yogyakarta, Indonesia
              </p>
              <p className="text-gray-400">
                Leading development of enterprise healthcare applications,
                implementing best practices, and mentoring junior developers.
              </p>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <a
                  href="https://www.linkedin.com/in/ahmad-gozali/"
                  className="inline-flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300 font-medium"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconMail size={18} className="mr-2" />
                  Contact Me
                </a>
              </div>
            </div>

            <div className="bg-gray-800/90 p-8 lg:w-1/2">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                Experience Summary
              </h3>
              <div className="grid grid-cols-2 gap-8 text-center">
                <div className="p-4 bg-gray-800/80 rounded-lg border border-gray-700">
                  <div className="text-3xl font-bold text-indigo-400 mb-1">
                    20+
                  </div>
                  <div className="text-sm text-gray-400">
                    Completed Projects
                  </div>
                </div>
                <div className="p-4 bg-gray-800/80 rounded-lg border border-gray-700">
                  <div className="text-3xl font-bold text-indigo-400 mb-1">
                    5+
                  </div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="p-4 bg-gray-800/80 rounded-lg border border-gray-700">
                  <div className="text-3xl font-bold text-indigo-400 mb-1">
                    10+
                  </div>
                  <div className="text-sm text-gray-400">Technologies</div>
                </div>
                <div className="p-4 bg-gray-800/80 rounded-lg border border-gray-700">
                  <div className="text-3xl font-bold text-indigo-400 mb-1">
                    99%
                  </div>
                  <div className="text-sm text-gray-400">
                    Client Satisfaction
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
