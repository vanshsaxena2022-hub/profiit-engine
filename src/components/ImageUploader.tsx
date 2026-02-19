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

      // ✅ create form data properly
      const form = new FormData();
      form.append("file", file);

      // ✅ send to API
      const res = await axios.post("/api/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ pass URL back to parent
      onUpload(res.data.url);
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
          if (e.target.files && e.target.files[0]) {
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
