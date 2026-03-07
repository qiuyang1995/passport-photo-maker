"use client";

import { useEffect, useRef } from "react";
import { adSlots } from "@/lib/ads/slots";
import { type Locale } from "@/lib/i18n/config";
import { hasAdsenseClient, publicEnv } from "@/lib/runtime/public-env";

type AdSlotProps = {
  locale: Locale;
  label: string;
  slotId?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

function getConfiguredSlot(slotId: string) {
  if (slotId === adSlots.toolResult) {
    return publicEnv.adsenseToolSlot;
  }

  if (slotId === adSlots.faqInline) {
    return publicEnv.adsenseFaqSlot;
  }

  return publicEnv.adsenseContentSlot;
}

export function AdSlot({
  label,
  slotId = adSlots.contentInline,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const configuredSlot = getConfiguredSlot(slotId);
  const shouldRenderLiveAd = hasAdsenseClient() && configuredSlot.length > 0;

  useEffect(() => {
    if (!shouldRenderLiveAd || !adRef.current) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      return;
    }
  }, [shouldRenderLiveAd]);

  if (!shouldRenderLiveAd) {
    return null;
  }

  return (
    <div
      className="border-line bg-surface/70 rounded-[1.75rem] border border-dashed p-5 text-center"
      style={{ minHeight: 160 }}
    >
      <p className="text-muted text-xs tracking-[0.26em] uppercase">Advertisement</p>
      <ins
        ref={adRef}
        className="adsbygoogle mt-4 block overflow-hidden rounded-2xl bg-white/60"
        style={{ display: "block", minHeight: 96 }}
        data-ad-client={publicEnv.adsenseClientId}
        data-ad-slot={configuredSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        aria-label={label}
      />
    </div>
  );
}
