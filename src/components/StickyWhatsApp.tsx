"use client";

import axios from "axios";

export default function StickyWhatsApp({
  phone,
  productName,
  shopId,
}: {
  phone: string;
  productName?: string;
  shopId: string;
}) {
  const handleClick = async () => {
    await axios.post("/api/track", {
      shopId,
      type: "whatsapp_click",
    });
  };

  const text = productName
    ? `Hello, I am interested in ${productName}`
    : "Hello, I found your catalogue";

  return (
    <a
      onClick={handleClick}
      href={`https://wa.me/${phone}?text=${encodeURIComponent(
        text
      )}`}
      target="_blank"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50"
    >
      <div className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold text-sm">
        Chat on WhatsApp
      </div>
    </a>
  );
}
