"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ProfileClient({ id }: { id: string }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error("Logout failed");
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setUser(response.data.data);
    } catch (error: any) {
      console.log("Failed to fetch user:", error.response?.data);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
      <h1 className="text-white text-2xl mb-4">Profile Page</h1>

      {/* ID from URL */}
      <span className="text-gray-400">Profile ID (URL): {id}</span>

      {/* Actual Logged User */}
      {user && (
        <>
          <p className="text-gray-400">Username: {user.username}</p>
          <p className="text-gray-400">Email: {user.email}</p>
        </>
      )}

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Logout
      </button>
    </div>
  );
}