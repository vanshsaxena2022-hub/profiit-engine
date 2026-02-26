"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateStorePage() {
  const router = useRouter();
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

  // 🔐 Protect page
  useEffect(() => {
    const auth = localStorage.getItem("internal-auth");

    if (!auth) {
      router.push("/internal-ops/login");
    }
  }, []);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    if (!form.name || !form.slug || !form.email || !form.password) {
      alert("Required fields missing");
      return;
    }

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
      console.error(err?.response?.data || err);
      alert("Store creation failed");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Create New Store
      </h2>

      <div className="space-y-3">

        <input
          name="name"
          placeholder="Store Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="slug"
          placeholder="Slug (royal-furniture)"
          value={form.slug}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="email"
          placeholder="Login Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="whatsappNumber"
          placeholder="WhatsApp Number"
          value={form.whatsappNumber}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="tagline"
          placeholder="Tagline"
          value={form.tagline}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="logoUrl"
          placeholder="Logo URL"
          value={form.logoUrl}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded"
        >
          {loading ? "Creating..." : "Create Store"}
        </button>

      </div>
    </div>
  );
}