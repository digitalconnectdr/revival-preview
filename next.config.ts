import type { NextConfig } from "next";

const deployTarget = process.env.DEPLOY_TARGET ?? "local";
const isStaticExport = deployTarget === "hostinger-static";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
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
