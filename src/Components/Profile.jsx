import React from "react"

export default function Profile() {
  // Technical skills with proficiency levels and years of experience
  const technicalSkills = [
    {
      name: "Next JS",
      desc: "Server-side rendering, static site generation, and API routes",
      image: "/images/nextjs.svg",
      proficiency: 88,
      years: 3,
    },
    {
      name: "React JS",
      desc: "Building scalable SPAs with Redux, Context API, and React Query",
      image: "/images/react-js.png",
      proficiency: 90,
      years: 4,
    },
    {
      name: "Vue JS",
      desc: "Developing modular applications with Vue 3, Vuex, and Composition API",
      image: "/images/vue-js.png",
      proficiency: 85,
      years: 3,
    },
    {
      name: "Laravel",
      desc: "Architecting enterprise applications with clean code principles",
      image: "/images/laravel.png",
      proficiency: 95,
      years: 5,
    },
    {
      name: "Codeigniter",
      desc: "Building high-performance PHP applications with MVC architecture",
      image: "/images/ci.png",
      proficiency: 90,
      years: 5,
    },
    {
      name: "PostgreSQL",
      desc: "Advanced relational database, complex queries, and performance optimization",
      image: "/images/pgsql.svg",
      proficiency: 85,
      years: 4,
    },
    {
      name: "MySQL",
      desc: "Database design, optimization, and performance tuning",
      image: "/images/mysql.png",
      proficiency: 85,
      years: 5,
    },
    {
      name: "Node.js",
      desc: "Building scalable backend services, REST APIs, and microservices",
      image: "/images/node-js.png",
      proficiency: 85,
      years: 3,
    },
    {
      name: "PHP",
      desc: "Object-oriented programming, APIs, and enterprise applications",
      image: "/images/php.svg",
      proficiency: 95,
      years: 6,
    },
    {
      name: "JavaScript",
      desc: "ES6+, TypeScript, async programming, and design patterns",
      image: "/images/javascript.png",
      proficiency: 90,
      years: 5,
    },
    {
      name: "CSS",
      desc: "Responsive design with Tailwind, SCSS, and CSS Grid/Flexbox",
      image: "/images/css.png",
      proficiency: 85,
      years: 5,
    },
    {
      name: "HTML",
      desc: "Semantic markup, accessibility, and SEO optimization",
      image: "/images/html.png",
      proficiency: 95,
      years: 5,
    },
  ]

  // Professional skills and competencies
  const professionalSkills = [
    { name: "System Architecture", value: 90 },
    { name: "API Design", value: 95 },
    { name: "Team Leadership", value: 85 },
    { name: "Project Management", value: 80 },
    { name: "Code Review", value: 90 },
    { name: "Performance Optimization", value: 85 },
  ]

  return (
    <div id="profile" className="py-10">
      <div className="container mx-auto max-w-[1200px] p-6 overflow-hidden">
        {/* Section header */}
        <div className="text-center mb-16">
          <h4
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-indigo-400 text-sm uppercase font-semibold tracking-wider mb-2"
          >
            Professional Background
          </h4>
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Full-Stack Developer
          </h2>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            className="w-24 h-1 bg-indigo-500 mx-auto mb-8 rounded-full"
          ></div>
        </div>

        {/* Profile content */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Profile image and intro */}
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="w-full lg:w-1/3 flex flex-col items-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full blur-md opacity-75"></div>
              <div className="relative max-w-[280px] max-h-[280px] rounded-full overflow-hidden border-4 border-gray-800">
                <img
                  className="w-full"
                  src="/images/ahmad.jpg"
                  alt="Ahmad Gozali - Full Stack Developer"
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-6 mb-3 text-white">
              Ahmad Gozali
            </h2>
            <p className="text-indigo-400 font-medium mb-6">
              Full Stack Developer at PT Apotek K-24
            </p>

            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 w-full">
              <h3 className="text-xl font-semibold text-white mb-4">
                Professional Summary
              </h3>
              <p className="text-gray-300 mb-4">
                Full Stack developer with 5+ years of experience architecting
                and implementing enterprise-grade web applications. Graduated
                from Yogyakarta University of Technology with a degree in
                Informatics Engineering.
              </p>
              <p className="text-gray-300">
                Proven track record of leading development teams and delivering
                high-quality solutions that meet business objectives and exceed
                client expectations.
              </p>

              <div className="mt-6">
                <h4 className="text-white font-medium mb-3">
                  Professional Skills
                </h4>
                {professionalSkills.map((skill, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 text-sm">
                        {skill.name}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {skill.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 h-1.5 rounded-full"
                        style={{ width: `${skill.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical skills */}
          <div className="w-full lg:w-2/3">
            <h3
              data-aos="fade-up"
              data-aos-duration="1000"
              className="text-2xl font-bold text-white mb-6"
            >
              Technical Expertise
            </h3>

            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="100"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {technicalSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 group"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 mr-4 flex items-center justify-center bg-gray-700 rounded-lg group-hover:bg-indigo-600/20 transition-all duration-300">
                        <img
                          src={skill.image}
                          alt={skill.name}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">
                          {skill.name}
                        </h4>
                        <div className="flex items-center">
                          <span className="text-indigo-400 text-sm">
                            {skill.years}+ years
                          </span>
                          <div className="w-1 h-1 bg-gray-600 rounded-full mx-2"></div>
                          <span className="text-gray-400 text-sm">
                            {skill.proficiency}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{skill.desc}</p>

                    <div className="mt-4 w-full bg-gray-700 rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 h-1 rounded-full"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
              className="mt-12 bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Career Highlights
              </h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-3"></div>
                  <p className="text-gray-300">
                    Led development of enterprise-level web applications,
                    resulting in 40% improvement in system performance and user
                    satisfaction.
                  </p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-3"></div>
                  <p className="text-gray-300">
                    Implemented CI/CD pipelines and automated testing, reducing
                    deployment time by 60% and improving code quality.
                  </p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-3"></div>
                  <p className="text-gray-300">
                    Architected and developed scalable APIs serving 1M+ requests
                    daily with 99.9% uptime.
                  </p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-3"></div>
                  <p className="text-gray-300">
                    Mentored junior developers, improving team productivity by
                    30% and fostering knowledge sharing.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
