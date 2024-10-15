// import { authMiddleware } from "@/middlewares/authMiddleware";
// import { corsMiddleware } from "@/middlewares/corsMiddleware";
// import { loggingMiddleware } from "@/middlewares/loggingMiddleware";
import { middlewareExample } from "@/middlewares/exampleMiddleware";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // const authResponse = authMiddleware(request);
    // if (authResponse) return authResponse;

    // const logResponse = loggingMiddleware(request);
    // if (logResponse) return logResponse;

    const exampleResponse = middlewareExample(request);
    return exampleResponse;
}

export const config = {
    matcher: "/api/:path*",
};
