"use client"

type Props = {
  glb?: string | null
  usdz?: string | null
}

export default function ARLauncher({ glb, usdz }: Props) {

  const openAR = () => {

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)

    const isAndroid = /Android/i.test(navigator.userAgent)

    // iOS → Quick Look
    if (isIOS && usdz) {
      const link = document.createElement("a")
      link.setAttribute("rel", "ar")
      link.setAttribute("href", usdz)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return
    }

    // Android → Scene Viewer
    if (isAndroid && glb) {
      const sceneViewerUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
        glb
      )}&mode=ar_preferred#Intent;scheme=https;package=com.google.ar.core;end;`

      window.location.href = sceneViewerUrl
      return
    }

    // Desktop fallback
    alert("AR is available on mobile devices only.")
  }

  return (
    <button
      onClick={openAR}
      className="bg-black text-white px-6 py-3 rounded-lg mt-4"
    >
      View in Your Space
    </button>
  )
}