import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  style?: React.CSSProperties;
  className?: string;
}

export function AdSenseAd({
  adSlot,
  adFormat = "auto",
  style = {},
  className = "",
}: AdSenseAdProps) {
  useEffect(() => {
    // Only load ads in production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    try {
      // Push ad to AdSense queue
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  // Don't render ads in development
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        className={`bg-gray-200 border-2 border-dashed border-gray-400 p-4 text-center text-sm text-gray-600 ${className}`}
        style={{ minHeight: "200px", ...style }}
      >
        [Ad Placeholder - Development Mode]
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-5649332072305685"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Predefined ad components for common placements
export function SidebarAd() {
  return (
    <AdSenseAd
      adSlot="YOUR_AD_SLOT_ID" // Get this from AdSense dashboard after creating ad unit
      adFormat="vertical"
      style={{ width: "300px", height: "250px" }}
      className="my-4"
    />
  );
}

export function HeaderAd() {
  return (
    <AdSenseAd
      adSlot="YOUR_AD_SLOT_ID" // Get this from AdSense dashboard
      adFormat="horizontal"
      style={{ width: "728px", height: "90px" }}
      className="mx-auto my-2"
    />
  );
}

export function ContentAd() {
  return (
    <AdSenseAd
      adSlot="YOUR_AD_SLOT_ID" // Get this from AdSense dashboard
      adFormat="rectangle"
      style={{ width: "336px", height: "280px" }}
      className="my-4 mx-auto"
    />
  );
}

export function ResponsiveAd() {
  return (
    <AdSenseAd
      adSlot="YOUR_AD_SLOT_ID" // Get this from AdSense dashboard
      adFormat="auto"
      style={{ minHeight: "200px" }}
      className="w-full my-4"
    />
  );
}

export default AdSenseAd;
