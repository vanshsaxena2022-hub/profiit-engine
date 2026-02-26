"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InternalLogin() {
  const [pass, setPass] = useState("");
  const router = useRouter();

  const login = () => {
    if (pass === process.env.NEXT_PUBLIC_INTERNAL_PASS) {
      localStorage.setItem("internal-auth", "true");
      router.push("/internal-ops/create-store");
    } else {
      alert("Access denied");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Internal Access
      </h2>

      <input
        type="password"
        placeholder="Enter Secret"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        className="w-full border px-3 py-2 mb-3 rounded"
      />

      <button
        onClick={login}
        className="w-full bg-black text-white py-2 rounded"
      >
        Enter
      </button>
    </div>
  );
}