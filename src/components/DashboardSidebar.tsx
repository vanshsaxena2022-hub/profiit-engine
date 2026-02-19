"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/add-product", label: "Add Product" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/contact", label: "Contact" },
];

export default function DashboardSidebar({
  shopName,
}: {
  shopName: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-100 min-h-screen p-6">
      {/* brand */}
      <div className="mb-10">
        <div className="text-2xl font-bold text-gray-900">
          {shopName}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Marketing Beyond Boundaries
        </div>
      </div>

      {/* nav */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* bottom brand */}
      <div className="mt-auto pt-8 text-xs text-gray-400">
        Powered by Peddle Profit
      </div>
    </aside>
  );
}
