import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function corsMiddleware(request: NextRequest) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
}
