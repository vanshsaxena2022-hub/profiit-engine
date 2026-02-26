"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      await axios.post("/api/admin-login", {
        email,
        password,
      });

      localStorage.setItem("admin-auth", "true");

      router.push("/admin/create-store");
    } catch {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Admin Login
      </h2>

      <input
        placeholder="Email"
        className="w-full border px-3 py-2 mb-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border px-3 py-2 mb-3 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="w-full bg-black text-white py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}