import { SignIn } from '@clerk/nextjs'

export const metadata = {
  title: 'Admin Sign In - Ahmad Gozali',
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to manage your portfolio</p>
        </div>
        <SignIn
          routing="path"
          path="/admin/sign-in"
          afterSignInUrl="/admin/dashboard"
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
