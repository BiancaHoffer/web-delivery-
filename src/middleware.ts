import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-cookie")?.value;

  const signInURL = new URL("/", request.url);
  const dashboardURL = new URL("/private/dashboard", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next();
    }

    return NextResponse.redirect(signInURL);
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(dashboardURL);
  }
}

export const config = {
  matcher: ["/", "/private/:path*"],
}