import { nonAuthRoutes, protectedRoutes } from "@/config/routes";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // This will refresh session if expired - required for Server Components
  const user = await supabase.auth.getUser();

  // Check config for the Routes

  // Check if the current route is protected and user is not authenticated
  if (
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    ) &&
    user.error
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Check if the current route is non-auth and user is already authenticated
  if (nonAuthRoutes.includes(request.nextUrl.pathname) && !user.error) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return response;
};
