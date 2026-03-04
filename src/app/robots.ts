import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/perangkat/",
        "/lurah/",
        "/api/",
        "/login",
        "/forgot-password",
        "/_next/",
        "/public/",
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/sitemap.xml`,
  };
}
