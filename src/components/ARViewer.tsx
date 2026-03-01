"use client"

import { useEffect, useRef } from "react"

export default function ARViewer({
  glb,
  usdz,
}: {
  glb: string
  usdz?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // load model viewer script only once
    if (!customElements.get("model-viewer")) {
      const script = document.createElement("script")
      script.type = "module"
      script.src =
        "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      document.head.appendChild(script)
    }

    const viewer = document.createElement("model-viewer")

    viewer.setAttribute("src", glb)
    if (usdz) viewer.setAttribute("ios-src", usdz)

    viewer.setAttribute("ar", "")
    viewer.setAttribute("ar-modes", "scene-viewer quick-look webxr")
    viewer.setAttribute("camera-controls", "")
    viewer.setAttribute("auto-rotate", "")
    viewer.setAttribute("shadow-intensity", "1")

    viewer.style.width = "100%"
    viewer.style.height = "80vh"
    viewer.style.background = "#fff"

    containerRef.current.innerHTML = ""
    containerRef.current.appendChild(viewer)

    return () => {
      containerRef.current?.removeChild(viewer)
    }
  }, [glb, usdz])

  return <div ref={containerRef} />
}