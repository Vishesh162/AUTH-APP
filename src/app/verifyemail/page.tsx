"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
    const [token, setToken] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("Verifying your email...");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");
        setToken(tokenFromUrl);

        if (tokenFromUrl) {
            verifyEmail(tokenFromUrl);
        } else {
            setError("No token found in URL");
            setLoading(false);
        }
    }, []);

    const verifyEmail = async (token: string) => {
        try {
            const response = await axios.get(`/api/verifyemail?token=${token}`);
            setMessage(response.data.message);
        } catch (error: any) {
            setError(error.response?.data?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
            <div className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-white mb-6">Email Verification</h1>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-400">Verifying your email...</p>
                    </div>
                )}

                {/* Success */}
                {!loading && !error && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-3xl">
                            ✓
                        </div>
                        <p className="text-green-400 text-lg">{message}</p>
                        <Link
                            href="/login"
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Go to Login
                        </Link>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-3xl">
                            ✗
                        </div>
                        <p className="text-red-400 text-lg">{error}</p>
                        <Link
                            href="/signup"
                            className="mt-4 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded-lg transition"
                        >
                            Back to Signup
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
