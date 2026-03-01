import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        ar?: boolean;
        "ar-modes"?: string;
        "ar-scale"?: string;
        "environment-image"?: string;
        "shadow-intensity"?: string;
        exposure?: string;
        poster?: string;
      };
    }
  }
}

export {};