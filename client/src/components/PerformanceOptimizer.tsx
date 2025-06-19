import { useEffect } from "react";

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload the main CSS if it exists as a separate file
      const cssLink = document.createElement("link");
      cssLink.rel = "preload";
      cssLink.as = "style";
      cssLink.href = "/src/index.css";
      document.head.appendChild(cssLink);
    };

    // Add resource hints for external domains
    const addResourceHints = () => {
      // DNS prefetch for Google services
      const dnsHints = [
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com",
        "https://pagead2.googlesyndication.com",
        "https://raw.githubusercontent.com",
      ];

      dnsHints.forEach((domain) => {
        const link = document.createElement("link");
        link.rel = "dns-prefetch";
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    // Optimize images loading
    const optimizeImages = () => {
      // Add loading="lazy" to images that aren't critical
      const images = document.querySelectorAll("img:not([loading])");
      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          img.setAttribute("loading", "lazy");
        }
      });
    };

    preloadCriticalResources();
    addResourceHints();

    // Delay image optimization until after initial render
    setTimeout(optimizeImages, 100);

    // Web Vitals tracking
    if ("web-vital" in window) {
      // This would require web-vitals library
      // Track Core Web Vitals for performance monitoring
    }
  }, []);

  return null;
}

export default PerformanceOptimizer;
