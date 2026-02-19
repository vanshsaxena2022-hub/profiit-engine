"use client";

import { useEffect, useState } from "react";

export default function ARPage({ params }: { params: { id: string } }) {
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  useEffect(() => {
    // load model viewer script on client
    import("@google/model-viewer");

    // TODO: replace with your real product fetch
    setModelUrl(
      "https://modelviewer.dev/shared-assets/models/Astronaut.glb"
    );
  }, [params.id]);

  if (!modelUrl) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <model-viewer
              src="${modelUrl}"
              ar
              auto-rotate
              camera-controls
              style="width:100%; height:500px;"
            ></model-viewer>
          `,
        }}
      />
    </div>
  );
}
