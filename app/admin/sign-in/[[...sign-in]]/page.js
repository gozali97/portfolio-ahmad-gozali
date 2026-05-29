import { SignIn } from '@clerk/nextjs'

export const metadata = {
  title: 'Admin Sign In - Ahmad Gozali',
}

export default function SignInPage({ searchParams }) {
  const expired = searchParams?.expired === '1'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to manage your portfolio</p>
        </div>

        {expired && (
          <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-700/50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-800 dark:text-amber-300 text-center">
            Your session expired after 10 minutes of inactivity. Please sign in again.
          </div>
        )}

        <SignIn
          routing="path"
          path="/admin/sign-in"
          fallbackRedirectUrl="/admin/dashboard"
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-xl rounded-2xl',
            },
          }}
        />
      </div>
    </div>
  )
}
