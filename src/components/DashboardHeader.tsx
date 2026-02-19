"use client";

import { signOut } from "next-auth/react";

export default function DashboardHeader({
  shopName,
}: {
  shopName: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hello, {shopName}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here's what's happening with your catalogue today.
        </p>
      </div>

      <button
        onClick={() => signOut()}
        className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition shadow-sm"
      >
        Logout
      </button>
    </div>
  );
}
