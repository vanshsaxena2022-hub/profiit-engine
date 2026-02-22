"use client";

import { useState } from "react";
import axios from "axios";

export default function ImageUploader({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const upload = async (file: File) => {
    try {
      setLoading(true);

      const form = new FormData();
      form.append("file", file);

      const res = await axios.post("/api/upload", form);

      // 🔥 VERY IMPORTANT — normalize response
      const url =
        res?.data?.url ||
        res?.data?.data?.url ||
        res?.data?.data?.display_url ||
        res?.data?.imageUrl;

      if (!url) {
        console.error("❌ Upload response:", res.data);
        alert("Upload succeeded but URL missing");
        return;
      }

      console.log("✅ Uploaded URL:", url);

      onUpload(url);
    } catch (err) {
      console.error("UPLOAD FRONTEND ERROR:", err);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 border-dashed rounded-xl p-4 text-center">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            upload(e.target.files[0]);
          }
        }}
      />

      {loading && (
        <div className="text-sm text-gray-500 mt-2">
          Uploading...
        </div>
      )}
    </div>
  );
}