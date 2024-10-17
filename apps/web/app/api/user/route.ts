// apps/web/app/api/user/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient"; // Ensure this path is correct

export async function GET() {
    try {
        // Query to fetch sellers (users where is_seller is true) along with their ratings
        const sellers = await prisma.user.findMany({
            where: {
                is_seller: true,
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                profile_pic: true,
                jobs: true,
                level: true,
                plan: true,
                skills: true,
                languages: true,
                created_at: true,
                freelancer_ratings: { // Correctly accessing the relation
                    select: {
                        id: true,
                        rating: true,
                        review: true,
                        created_at: true,
                    },
                },
                buyer_ratings: { // Include buyer ratings if needed
                    select: {
                        id: true,
                        rating: true,
                        review: true,
                        created_at: true,
                    },
                },
            },
        });
        
        

        return NextResponse.json(sellers, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching sellers:', error.message); // Log the error message
        return NextResponse.json({ error: 'Failed to fetch sellers' }, { status: 500 });
    }
}
