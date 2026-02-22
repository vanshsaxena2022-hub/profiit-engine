"use client";

import { useEffect, useRef } from "react";
import "@google/model-viewer";

export default function ARViewer({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = `
      <model-viewer
        src="${src}"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        style="width:100%;height:500px;"
      ></model-viewer>
    `;
  }, [src]);

  return <div ref={containerRef} />;
}