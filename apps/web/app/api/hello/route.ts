import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        console.log(`[INFO] Request method: ${req.method}`);
        // Simulate a potential error for demonstration purposes
        if (!req) {
            console.error("[ERROR] Invalid request");
            return NextResponse.json({ error: "Bad Request" }, { status: 400 });
        }

        const data = { message: "Hello from GET method!" };
        console.log(`[SUCCESS] Response data: ${JSON.stringify(data)}`);
        return NextResponse.json(data, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`[ERROR] Error occurred: ${error.message}`);
        } else {
            console.error("[ERROR] Unknown error occurred");
        }

        let statusCode = 500;
        let errorMessage = "Internal Server Error";

        console.error(
            `[ERROR] Status Code: ${statusCode}, Message: ${errorMessage}`,
        );
        return NextResponse.json(
            { error: errorMessage },
            { status: statusCode },
        );
    }
}
