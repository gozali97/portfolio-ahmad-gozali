import { getProjects, getTechStacks, getProfile } from '@/lib/data'
import { FolderKanban, Cpu, User, TrendingUp } from 'lucide-react'

export const metadata = { title: 'Dashboard - Admin' }

export default function Dashboard() {
  const profile = getProfile()
  const projects = getProjects()
  const techStacks = getTechStacks()

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderKanban, color: 'bg-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Tech Stacks', value: techStacks.length, icon: Cpu, color: 'bg-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Live Projects', value: projects.filter(p => p.is_live).length, icon: TrendingUp, color: 'bg-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Profile', value: profile.full_name ? '✓' : '✗', icon: User, color: 'bg-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Welcome back, {profile.full_name}!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-6 border border-gray-100 dark:border-gray-700`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`${color} p-3 rounded-xl text-white`}><Icon size={24} /></div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Projects</h2>
        <div className="space-y-3">
          {projects.slice(0, 5).map((p) => (
            <div key={p.id} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700 last:border-0">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{p.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{p.category}</div>
              </div>
              {p.is_live ? (
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">Live</span>
              ) : (
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500">Draft</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
