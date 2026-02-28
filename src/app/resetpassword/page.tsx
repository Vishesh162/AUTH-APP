"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");
        if (tokenFromUrl) setToken(tokenFromUrl);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("/api/resetpassword", {
                token,
                newPassword,
            });
            setMessage(response.data.message);

            // Redirect to login after 2 seconds
            setTimeout(() => router.push("/login"), 2000);
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
            <div className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-white mb-2 text-center">
                    Reset Password
                </h1>
                <p className="text-gray-400 text-sm text-center mb-6">
                    Enter your new password below
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white py-3 rounded-lg font-semibold transition"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                {/* Success */}
                {message && (
                    <div className="mt-4 bg-green-900 text-green-400 px-4 py-3 rounded-lg text-sm text-center">
                        {message} Redirecting to login...
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mt-4 bg-red-900 text-red-400 px-4 py-3 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <p className="text-gray-500 text-sm text-center mt-6">
                    Remember your password?{" "}
                    <Link href="/login" className="text-blue-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}