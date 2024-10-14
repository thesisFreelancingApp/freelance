import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function GET(req: NextRequest) {
  try {
    // Fetch all services from the database and include related category and users
    const services = await prisma.service.findMany({
      include: {
        // category: true,  // Ensure this matches the relation name in your schema
        // users: true,     // Ensure this matches the relation name in your schema
      },
    });

    // Return the services in the response
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);

    // Return a 500 error response if something goes wrong
    return NextResponse.json(
      { error: "Internal Server Error", message: (error as Error).message },
      { status: 500 }
    );
  }
}