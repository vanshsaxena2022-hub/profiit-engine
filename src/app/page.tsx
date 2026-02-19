"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    await axios.post("/api/products", {
      name: "Sample Product",
      description: "Demo description",
      category: "Furniture",
      arModelUrl: "https://example.com/model.glb",
      images: [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/400",
      ],
    });

    fetchProducts();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={addProduct}>Add Sample Product</button>

      <div>
        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: 20 }}>
            <h3>{product.name}</h3>
            {product.images.map((img: any) => (
              <img key={img.id} src={img.imageUrl} width={100} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
