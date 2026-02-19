import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        'ios-src'?: string;
        ar?: boolean;
        'ar-scale'?: string;
        'ar-modes'?: string;
        'camera-controls'?: boolean;
        alt?: string;
        // Add any other specific attributes you use
      };
    }
  }
}
