import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const production = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "object-src 'none'",
  "img-src 'self' https: data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${production ? "" : " 'unsafe-eval'"}`,
  `connect-src 'self'${production ? "" : " ws: wss:"}`,
].join("; ");

const legacyRedirect = (source: string, destination: string) => ({
  source,
  destination,
  statusCode: 301 as const,
});

const nextConfig: NextConfig = {
  trailingSlash: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/regulatory-horizon/index.html",
        destination: "/regulatory-horizon/",
        permanent: true,
      },
      {
        source: "/dashboard/assets/financial-services-intelligence-hero.webp",
        destination: "/dashboard/assets/financial-services-intelligence-hero.svg",
        permanent: true,
      },
      legacyRedirect("/intelligence", "/brief/"),
      legacyRedirect("/intelligence/archive", "/archive/"),
      legacyRedirect("/intelligence/archive/:path*", "/archive/brief/:path*"),
      legacyRedirect("/intelligence/regulatory-horizon", "/regulatory-horizon/"),
      legacyRedirect("/intelligence/regulatory-horizon/:path*", "/regulatory-horizon/:path*"),
      legacyRedirect("/intelligence/:path*", "/brief/"),
      legacyRedirect("/ai-signals", "/signals/ai/"),
      legacyRedirect("/ai-signals/archive", "/archive/"),
      legacyRedirect("/ai-signals/archive/:path*", "/signals/ai/archive/:path*"),
      legacyRedirect("/ai-signals/:path*", "/signals/ai/"),
      legacyRedirect("/thevirtualofficer", "/about/"),
      legacyRedirect("/thevirtualofficer/brief", "/brief/"),
      legacyRedirect("/thevirtualofficer/signals", "/signals/"),
      legacyRedirect("/thevirtualofficer/signals/ai", "/signals/ai/"),
      legacyRedirect("/thevirtualofficer/regulatory-horizon", "/regulatory-horizon/"),
      legacyRedirect("/thevirtualofficer/regulatory-horizon/:path*", "/regulatory-horizon/:path*"),
      legacyRedirect("/thevirtualofficer/:path*", "/about/"),
    ];
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
