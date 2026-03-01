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

    // Load model-viewer once
    if (!customElements.get("model-viewer")) {
      const script = document.createElement("script")
      script.type = "module"
      script.src =
        "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      document.head.appendChild(script)
    }

    const viewer = document.createElement("model-viewer")

    // 🔥 CORE CONFIG
    viewer.setAttribute("src", glb)

    if (usdz) {
      viewer.setAttribute("ios-src", usdz)
    }

    viewer.setAttribute("ar", "")
    viewer.setAttribute("ar-modes", "scene-viewer quick-look webxr")
    viewer.setAttribute("ar-scale", "auto")
    viewer.setAttribute("camera-controls", "")
    viewer.setAttribute("auto-rotate", "")
    viewer.setAttribute("shadow-intensity", "1")
    viewer.setAttribute("environment-image", "neutral")

    // 🔥 IMPORTANT → allow camera launch
    viewer.setAttribute("camera-orbit", "0deg 75deg 2.5m")
    viewer.setAttribute("interaction-prompt", "auto")

    viewer.style.width = "100%"
    viewer.style.height = "100vh"
    viewer.style.background = "#fff"

    containerRef.current.innerHTML = ""
    containerRef.current.appendChild(viewer)

    // 🔥 AUTO OPEN AR ON MOBILE
    viewer.addEventListener("load", () => {
      const isMobile =
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

      if (isMobile) {
        setTimeout(() => {
          if ((viewer as any).activateAR) {
            (viewer as any).activateAR()
             }  
                  }, 500)
      }
    })

    return () => {
      containerRef.current?.removeChild(viewer)
    }

  }, [glb, usdz])

  return <div ref={containerRef} />
}