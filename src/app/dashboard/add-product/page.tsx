"use client";

import { useState } from "react";
import axios from "axios";
import ImageUploader from "@/components/ImageUploader";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name || !category) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      // 🔥 DEBUG — do not remove until fully stable
      console.log("🚀 SENDING IMAGES:", images);

      await axios.post("/api/products", {
        name,
        category,
        description,
        images, // ✅ must be array of URLs
      });

      alert("Product added successfully");

      // reset form
      setName("");
      setCategory("");
      setDescription("");
      setImages([]);
    } catch (err: any) {
      console.error(
        "ADD PRODUCT ERROR:",
        err?.response?.data || err
      );

      alert(
        err?.response?.data?.error ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-5">
        Add New Product
      </h2>

      <div className="space-y-4">
        {/* PRODUCT NAME */}
        <input
          className="w-full border rounded-xl px-3 py-2"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* CATEGORY */}
        <input
          className="w-full border rounded-xl px-3 py-2"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          className="w-full border rounded-xl px-3 py-2"
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* IMAGE UPLOADER */}
        <ImageUploader
          onUpload={(url) => {
            console.log("📸 IMAGE ADDED:", url);
            setImages((prev) => [...prev, url]);
          }}
        />

        {/* IMAGE COUNT */}
        <div className="text-xs text-gray-500">
          Uploaded images: {images.length}
        </div>

        {/* SUBMIT */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>
    </div>
  );
}