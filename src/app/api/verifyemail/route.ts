import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
  try {
    await connect();

    // ✅ Get token from URL query params (?token=xxx)
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }

    console.log("Received token for verification:", token);

    // ✅ Use verifyToken (matches your userModel field name)
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }, // ✅ check token not expired
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // ✅ Mark user as verified and clear token
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    console.log("✅ User verified:", user.email);

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });

  } catch (error: any) {
    console.log("❌ Verify Email Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}