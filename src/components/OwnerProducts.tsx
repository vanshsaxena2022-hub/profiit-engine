"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function OwnerProducts() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    await axios.delete(`/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Your Products</h2>

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <strong>{p.name}</strong>

          <button
            onClick={() => deleteProduct(p.id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
