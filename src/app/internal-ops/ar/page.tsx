"use client";

import { useState } from "react";
import axios from "axios";

export default function ARPanel() {
  const [productId, setProductId] = useState("");
  const [url, setUrl] = useState("");

  const submit = async () => {
    await axios.post("/api/internal/update-ar", {
      productId,
      arUrl: url
    });

    alert("AR Enabled");
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-lg font-bold mb-4">Enable AR</h2>

      <input
        placeholder="Product ID"
        value={productId}
        onChange={e => setProductId(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input
        placeholder="GLB URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2"
      >
        Enable AR
      </button>
    </div>
  );
}