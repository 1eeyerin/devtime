import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/shared/auth";

const publicPaths = ["/login", "/signup"];
const authPaths = ["/api/auth/login", "/api/auth/refresh"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    publicPaths.includes(pathname) ||
    authPaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { success: false, message: "인증이 필요합니다." },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};
