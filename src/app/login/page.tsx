"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/login", user);
      console.log("Login success:", response.data);
      router.push("/dashboard");
    } catch (error: any) {
      console.log("Login failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
      <h1 className="text-center text-white text-2xl mb-4">
        {loading ? "Processing..." : "Login Page"}
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="mb-2 px-4 py-2 rounded-md border border-gray-300"
      />

      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="mb-4 px-4 py-2 rounded-md border border-gray-300"
      />

      <button
        onClick={onLogin}
        disabled={buttonDisabled}
        className="mb-4 px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-400"
      >
        Login
      </button>

      {/* ✅ Forgot Password link */}
      <Link href="/forgotpassword" className="text-sm text-blue-400 hover:underline mb-4">
        Forgot Password?
      </Link>

      <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Signup here
        </Link>
      </p>
    </div>
  );
}