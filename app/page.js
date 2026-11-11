import { getProfile, getProjects, getTopTechStacks, getTechStacksByCategory } from '@/lib/data'
import { getGithubUsername, getGithubContributions } from '@/lib/github'
import Navigation from '@/components/Navigation'
import Banner from '@/components/Banner'
import Profile from '@/components/Profile'
import Portfolio from '@/components/Portfolio'
import GithubActivity from '@/components/GithubActivity'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

// Re-read from MySQL at most every 60s; admin writes also call revalidatePath('/').
export const revalidate = 60

export default async function Home() {
  const [profile, projects, topTech, techStacksByCategory] = await Promise.all([
    getProfile(),
    getProjects(),
    getTopTechStacks(5),
    getTechStacksByCategory(),
  ])

  const githubUsername = getGithubUsername(profile)
  const githubData = await getGithubContributions(githubUsername)

  return (
    <div className="relative min-h-screen transition-colors duration-500">
      <StructuredData profile={profile} projects={projects} />

      <div className="relative z-10">
        <Navigation resumeUrl={profile.resume_url} />
        <Banner profile={profile} topTech={topTech} projects={projects} techStacksByCategory={techStacksByCategory} />
        <Profile profile={profile} techStacksByCategory={techStacksByCategory} />
        <Portfolio projects={projects} />
        <GithubActivity data={githubData} username={githubUsername} profileUrl={profile.github_url} />
        <Contact profile={profile} />
        <Footer profile={profile} />
      </div>
    </div>
  )
}
