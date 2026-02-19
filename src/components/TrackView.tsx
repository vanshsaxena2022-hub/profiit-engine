"use client";

import { useEffect } from "react";
import axios from "axios";

export default function TrackView({
  shopId,
  productId,
}: {
  shopId: string;
  productId?: string;
}) {
  useEffect(() => {
    axios.post("/api/track", {
      shopId,
      productId,
      type: "link_open",
    });
  }, [shopId, productId]);

  return null;
}
