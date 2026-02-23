"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
};

export default function ARViewer({ src }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !src) return;

    // load model-viewer script once
    if (!document.getElementById("model-viewer-script")) {
      const script = document.createElement("script");
      script.id = "model-viewer-script";
      script.type = "module";
      script.src =
        "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
      document.head.appendChild(script);
    }

    // inject model-viewer safely
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

  // ✅ CRITICAL: must return JSX
  return <div ref={containerRef} />;
}