import nodemailer from "nodemailer";
import User from "@/models/userModel";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
}) => {
    try {
        const hashedToken = crypto.randomBytes(32).toString("hex");

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000, // ✅ fixed field name
            });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT),
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        const mailOptions = {
            from: '"My App" <no-reply@myapp.com>',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <p>Click the link below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}:</p>
                <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">
                    Click here
                </a>
                <p>This link expires in 1 hour.</p>
            `,
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
};