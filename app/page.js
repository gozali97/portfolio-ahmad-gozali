import { getProfile, getProjects, getTopTechStacks, getTechStacksByCategory } from '@/lib/data'
import Navigation from '@/components/Navigation'
import Banner from '@/components/Banner'
import Profile from '@/components/Profile'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  const profile = getProfile()
  const projects = getProjects()
  const topTech = getTopTechStacks(5)
  const techStacksByCategory = getTechStacksByCategory()

  return (
    <div className="relative min-h-screen transition-colors duration-500">
      <div className="blob-bg" />
      <div className="noise-overlay" />

      <div className="relative z-10">
        <Navigation resumeUrl={profile.resume_url} />
        <Banner profile={profile} topTech={topTech} />
        <div className="section-divider max-w-6xl mx-auto" />
        <Profile profile={profile} techStacksByCategory={techStacksByCategory} />
        <div className="section-divider max-w-6xl mx-auto" />
        <Portfolio projects={projects} />
        <div className="section-divider max-w-6xl mx-auto" />
        <Contact profile={profile} />
        <Footer profile={profile} />
      </div>
    </div>
  )
}
