// /app/api/username/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient'; // Adjust the path to your Prisma instance

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username'); // Get username from query parameters

    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // Check if the username already exists
    const existingUser = await prisma.user.findUnique({
        where: { username }, // Use the username directly
    });

    if (existingUser) {
        // Username already exists
        return NextResponse.json({ isAvailable: false });
    }

    // Username is available
    return NextResponse.json({ isAvailable: true });
}
