import { NextResponse } from "next/server";
import { auth as proxy } from "@/auth"

export default proxy((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // Checks if a valid session JWT exists
  const userRole = req.auth?.user?.role; // Retrieves custom role populated by your callback

  // 1. Define your route patterns
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isAuthRoute = nextUrl.pathname === "/login" || nextUrl.pathname === "/register";

  // 2. Prevent logged-in users from accessing authentication pages (Login/Register)
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  // 3. Protect standard private routes
  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 4. Protect role-based admin routes
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl)); // Redirect unauthorized users
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}