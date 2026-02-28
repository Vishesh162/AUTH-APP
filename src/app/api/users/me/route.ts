import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    // ✅ Fix 6: JWT_SECRET_KEY → TOKEN_SECRET (matches login route)
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User fetched successfully",
      data: user,
    });

  } catch (error: any) {
    console.log("ME API ERROR:", error.message);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
