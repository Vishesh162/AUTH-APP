import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        // Remove the token cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Expire immediately
            path: "/",            // Important to match original cookie path
        });

        return response;

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}