import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ Fix 1: Renamed "proxy" → "middleware"
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isPublicPath = pathname === "/login" || pathname === "/signup"|| pathname==="/verifyemail"|| pathname==="/forgotpassword" || pathname==="/resetpassword";

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Fix 2: Redirect to "/" not "/profile" (no page there)
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup" ,"/verifyemail","/forgotpassword","/resetpassword"],
};