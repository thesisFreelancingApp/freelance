import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function loggingMiddleware(request: NextRequest) {
  console.log("Request URL:", request.url);
  return NextResponse.next();
}
