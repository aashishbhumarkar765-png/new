import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/private/"]
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1
      }
    ],
    sitemap: "https://shreeskills.com/sitemap.xml",
    host: "https://shreeskills.com"
  };
}
