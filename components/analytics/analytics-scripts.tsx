import Script from "next/script";
import { hasAdsenseClient, hasGaConfig, publicEnv } from "@/lib/runtime/public-env";

export function AnalyticsScripts() {
  return (
    <>
      {hasGaConfig() ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${publicEnv.gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag("js", new Date());
              gtag("config", "${publicEnv.gaMeasurementId}", { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {hasAdsenseClient() ? (
        <Script
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publicEnv.adsenseClientId}`}
        />
      ) : null}
    </>
  );
}
