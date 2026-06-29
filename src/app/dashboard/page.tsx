import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth() // Fetches server-side cached session token securely [4]

  // Fallback assertion layer
  if (!session) {
    redirect("/login")
  }

  console.log(session, "sss")

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard Workspace</h1>
      <p>
        Welcome back, <strong>{session.user?.email}</strong>!
      </p>
      <p>
        Your Access Role:{" "}
        <span style={{ color: "blue" }}>{session.user?.role}</span>
      </p>
      <form
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/login" })
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  )
}
