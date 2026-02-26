"use client";

import { useState } from "react";
import axios from "axios";

export default function CreateStorePage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    email: "",
    password: "",
    whatsappNumber: "",
    tagline: "",
    logoUrl: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    setLoading(true);

    try {
      await axios.post("/api/onboard", form);
      alert("Store Created Successfully ✅");

      setForm({
        name: "",
        slug: "",
        email: "",
        password: "",
        whatsappNumber: "",
        tagline: "",
        logoUrl: "",
      });

    } catch (err: any) {
      console.error("CREATE STORE ERROR:", err?.response?.data || err);
      alert(err?.response?.data?.error || "Failed");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-2xl shadow border">
      <h2 className="text-lg font-semibold mb-4">
        Create New Store
      </h2>

      <div className="space-y-3">

        <input name="name" placeholder="Store Name"
          value={form.name} onChange={handleChange}
          className="w-full border px-3 py-2 rounded-xl"
        />

        <input name="slug" placeholder="Slug (royal-furniture)"
          value={form.slug} onChange={handleChange}
          className="w-full border px-3 py-2 rounded-xl"
        />

        <input name="email" placeholder="Login Email"
          value={form.email} onChange={handleChange}
          className="w-full border px-3 py-2 rounded-xl"
        />

        <input name="password" placeholder="Password"
          value={form.password} onChange={handleChange}
          className="w-full border px-3 py-2 rounded-xl"
        />

        <input name="whatsappNumber" placeholder="WhatsApp"
          value={form.whatsappNumber} onChange={handleChange}
          className="w-full border px-3 py-2 rounded-xl"
        />

        <input name="tagline" placeholder="Tagline"
          value={form.tagline} onChange={handleChange}
          className="w-full border px-3 py-2 rounded-xl"
        />

        <input name="logoUrl" placeholder="Logo URL"
          value={form.logoUrl} onChange={handleChange}
          className="w-full border px-3 py-2 rounded-xl"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Creating..." : "Create Store"}
        </button>

      </div>
    </div>
  );
}