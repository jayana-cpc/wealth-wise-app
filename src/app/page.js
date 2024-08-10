"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
      });
    };

    // Track the initial page load
    handleRouteChange(window.location.pathname);

    // Track route changes
    const handleRouteChangeComplete = (url) => handleRouteChange(url);
    
    router.push = new Proxy(router.push, {
      apply: (target, thisArg, args) => {
        handleRouteChangeComplete(args[0]);
        return target.apply(thisArg, args);
      }
    });

  }, [router]);

  return null;
}
