"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ARPage({ params }: any) {
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`/api/public-product/${params.id}`);
      setModelUrl(res.data.arModelUrl);
    };

    fetchProduct();
  }, [params.id]);

  if (!modelUrl) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <model-viewer
        src={modelUrl}
        ar
        auto-rotate
        camera-controls
        style={{ width: "100%", height: "500px" }}
      ></model-viewer>
    </div>
  );
}
