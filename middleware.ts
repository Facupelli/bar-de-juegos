import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
// export { default } from "next-auth/middleware";

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/admin");
};

const isApiRoute = (pathname: string) => {
  return pathname.startsWith("/api");
};

export default withAuth(function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.nextauth.token;

  console.log(
    "ACA -------------------------->",
    isAdminRoute(pathname),
    token?.role !== "ADMIN"
  );

  if (isAdminRoute(pathname) && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isAdminRoute(pathname) && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isApiRoute(pathname) && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/admin", "/admin/:path*", "/user/:path*"],
};
