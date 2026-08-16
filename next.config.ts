import type { NextConfig } from "next";

const deployTarget = process.env.DEPLOY_TARGET ?? "local";
const isStaticExport = deployTarget === "hostinger-static";
const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production" || process.env.DEPLOYMENT_STAGE === "production";
const contentSecurityPolicy = "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; frame-src 'self' https://www.openstreetmap.org; form-action 'self'; img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com";

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  ...(isProduction ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }] : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: isStaticExport,
  images: { unoptimized: isStaticExport },
  ...(isStaticExport ? { output: "export" } : {}),
  ...(!isStaticExport
    ? {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }
    : {}),
};

export default nextConfig;
