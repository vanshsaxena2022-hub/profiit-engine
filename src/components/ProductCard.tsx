"use client";

import Link from "next/link";

interface Props {
  id: string;
  name: string;
  image?: string;
}

export default function ProductCard({ id, name, image }: Props) {
  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-3 cursor-pointer">
        <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        <p className="mt-2 text-sm font-medium text-gray-800 truncate">
          {name}
        </p>
      </div>
    </Link>
  );
}
