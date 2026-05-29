import { getProfile, getProjects, getTopTechStacks, getTechStacksByCategory } from '@/lib/data'
import Navigation from '@/components/Navigation'
import Banner from '@/components/Banner'
import Profile from '@/components/Profile'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

export default function Home() {
  const profile = getProfile()
  const projects = getProjects()
  const topTech = getTopTechStacks(5)
  const techStacksByCategory = getTechStacksByCategory()

  return (
    <div className="relative min-h-screen transition-colors duration-500">
      <StructuredData profile={profile} projects={projects} />
      <div className="column-guides" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="relative z-10">
        <Navigation resumeUrl={profile.resume_url} />
        <Banner profile={profile} topTech={topTech} />
        <Profile profile={profile} techStacksByCategory={techStacksByCategory} />
        <Portfolio projects={projects} />
        <Contact profile={profile} />
        <Footer profile={profile} />
      </div>
    </div>
  )
}
