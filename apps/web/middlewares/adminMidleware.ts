// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server"; // Ensure your Supabase client is imported correctly
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function middleware(request: NextRequest) {
//   // Initialize Supabase client
//   const supabase = createClient();

//   // Get the authenticated user from Supabase
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();

//   // If no user is found or there's an error, redirect to login
//   if (userError || !user) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Fetch the user's role from the Prisma database using the user ID from Supabase
//   const authUser = await prisma.authUser.findUnique({
//     where: { id: user.id },
//     select: { role: true },
//   });

//   // Handle case where user is not found in Prisma or there's an error
//   if (!authUser) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Check if the user has an admin role
//   if (authUser.role !== "ADMIN") {
//     // Redirect non-admin users to the home page
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Allow access to admins
//   return NextResponse.next();
// }

// // Specify the paths for the middleware to match
// export const config = {
//   matcher: "/admin-dashboard", // Replace with your actual dashboard route
// };
