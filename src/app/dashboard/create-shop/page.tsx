"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateShopPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");

  const createShop = async () => {
    await axios.post("/api/create-shop", {
      name,
      slug,
      whatsapp,
      ownerEmail,
      ownerPassword,
    });

    router.push("/dashboard");
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Create Shop</h1>

      <input placeholder="Shop Name" onChange={(e) => setName(e.target.value)} />
      <br /><br />
      <input placeholder="Slug" onChange={(e) => setSlug(e.target.value)} />
      <br /><br />
      <input placeholder="WhatsApp Number" onChange={(e) => setWhatsapp(e.target.value)} />
      <br /><br />
      <input placeholder="Owner Email" onChange={(e) => setOwnerEmail(e.target.value)} />
      <br /><br />
      <input
        type="password"
        placeholder="Owner Password"
        onChange={(e) => setOwnerPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={createShop}>Create</button>
    </div>
  );
}
