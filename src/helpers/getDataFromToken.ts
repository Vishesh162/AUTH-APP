import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
    try {
        // ✅ Get token from cookies (NextRequest supports this)
        const token = request.cookies.get("token")?.value;

        // ❌ If no token → redirect to login
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // ✅ Verify token
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY!
        );

        console.log("Decoded Token:", decodedToken);

        // ✅ Allow request
        return NextResponse.next();

    } catch (error) {
        console.log("Token verification failed:", error);

        // ❌ Invalid token → force logout
        return NextResponse.redirect(new URL("/login", request.url));
    }
}