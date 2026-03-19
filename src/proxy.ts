
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

const PUBLIC_ROUTES = new Set([
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
]);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  console.log("session", req.auth)

  const session = req.auth;
  const isAuthed = !!session?.user?.id;
  const onboarded = session?.user?.onboardingDone ?? false;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/settings/confirm-email")) {
    return NextResponse.next();
  }

  if (isAuthed && PUBLIC_ROUTES.has(pathname)) {
    const dest = onboarded ? "/dashboard" : "/onboarding";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  if (!isAuthed && !PUBLIC_ROUTES.has(pathname)) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthed && !onboarded && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (isAuthed && onboarded && pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
