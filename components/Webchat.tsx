'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    AchieveApexWebchat?: {
      init: (config: { apiKey: string }) => void;
    };
  }
}

export default function Webchat() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://achieveapex-webchat.s3.amazonaws.com/webchat.js';
    script.async = true;
    script.onload = () => {
      if (typeof window !== 'undefined' && window.AchieveApexWebchat) {
        window.AchieveApexWebchat.init({
          apiKey: 'wc_bmBBMg8JFOAzt69XHkD4KZ1CvgLvmZ7twNRWh2LY',
        });
      }
    };
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
