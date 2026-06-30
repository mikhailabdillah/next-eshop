import { signIn } from "@/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function LoginPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>
}) {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <form
          action={async (formData) => {
            "use server"
            try {
              await signIn("credentials", formData)
            } catch (error) {
              throw error
            }
          }}
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
        <form
          action={async () => {
            "use server"
            try {
              const { callbackUrl } = await props.searchParams
              await signIn("google", {
                redirectTo: callbackUrl ?? "",
              })
            } catch (error) {
              throw error
            }
          }}
          className="flex justify-center mt-6"
        >
          <Button type="submit">Login with Google</Button>
        </form>
      </div>
    </section>
  )
}
