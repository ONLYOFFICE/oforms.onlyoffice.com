import "./loadEnv";
import { writeFile } from "fs/promises";
import path from "path";
import { buildRobotsTxt } from "@src/lib/server/buildRobots";
import { buildSitemapXml } from "@src/lib/server/buildSitemap";

const PUBLIC_DIR = path.join(process.cwd(), "public");

const isHttpUrl = (value: string): boolean => {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

const main = async () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  if (!isHttpUrl(siteUrl)) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL, got "${siteUrl}"`,
    );
  }

  const robots = buildRobotsTxt();
  const sitemap = await buildSitemapXml();

  await Promise.all([
    writeFile(path.join(PUBLIC_DIR, "robots.txt"), robots),
    writeFile(path.join(PUBLIC_DIR, "sitemap.xml"), sitemap),
  ]);

  const urlCount = sitemap.split("<loc>").length - 1;

  console.log(
    `[seo] wrote public/robots.txt and public/sitemap.xml (${urlCount} urls) for ${siteUrl}`,
  );
};

main().catch((error) => {
  console.error("[seo]", error instanceof Error ? error.message : error);
  process.exit(1);
});
