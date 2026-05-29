'use client'

import { UserButton, useClerk } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FolderKanban, Cpu, User, ArrowLeft, LogOut } from 'lucide-react'
import SessionTimeout from '@/components/SessionTimeout'

const sidebarItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/tech', label: 'Tech Stack', icon: Cpu },
  { href: '/admin/profile', label: 'Profile', icon: User },
]

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const { signOut } = useClerk()

  // Don't show layout for sign-in page
  if (pathname.startsWith('/admin/sign-in')) {
    return children
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            <span className="text-cyan-600">Admin</span> Panel
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <Icon size={20} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Back to Site
          </Link>

          <button
            onClick={() => signOut({ redirectUrl: '/admin/sign-in' })}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>

          <div className="flex items-center gap-3 px-4 pt-1">
            <UserButton afterSignOutUrl="/" />
            <span className="text-xs text-gray-400 dark:text-gray-500">Auto-logout in 10 min idle</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>

      {/* Idle session timeout (10 minutes) */}
      <SessionTimeout />
    </div>
  )
}
