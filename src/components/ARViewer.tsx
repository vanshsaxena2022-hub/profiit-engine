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
  const viewerRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Load model-viewer script once
    if (!customElements.get("model-viewer")) {
      const script = document.createElement("script")
      script.type = "module"
      script.src =
        "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      document.head.appendChild(script)
    }

    const viewer = document.createElement("model-viewer")

    viewer.setAttribute("src", glb)

    if (usdz) {
      viewer.setAttribute("ios-src", usdz)
    }

    viewer.setAttribute("ar", "")
    viewer.setAttribute("ar-modes", "scene-viewer quick-look webxr")
    viewer.setAttribute("ar-scale", "auto")

    // 🔥 Hide viewer completely (no inline rendering)
    viewer.style.width = "0px"
    viewer.style.height = "0px"
    viewer.style.position = "absolute"

    containerRef.current.innerHTML = ""
    containerRef.current.appendChild(viewer)

    viewerRef.current = viewer

    return () => {
      containerRef.current?.removeChild(viewer)
    }
  }, [glb, usdz])

  const launchAR = () => {
    if (viewerRef.current && viewerRef.current.activateAR) {
      viewerRef.current.activateAR()
    }
  }

  return (
    <div>
      <div ref={containerRef} />

      <button
        onClick={launchAR}
        className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
      >
        View in AR
      </button>
    </div>
  )
}