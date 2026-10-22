import { GetServerSideProps } from "next";
import { getSitemapXml } from "@src/lib/server/buildSitemap";
import { DEFAULT_LOCALE, getSiteUrl } from "@src/utils/seoUrl";

const FRESH_CACHE_CONTROL =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";
const STALE_CACHE_CONTROL = "public, max-age=0, s-maxage=300";

const SitemapPage = () => null;

export const getServerSideProps: GetServerSideProps = async ({
  res,
  locale,
}) => {
  if (locale !== DEFAULT_LOCALE || !getSiteUrl()) return { notFound: true };

  try {
    const { xml, stale } = await getSitemapXml();

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      stale ? STALE_CACHE_CONTROL : FRESH_CACHE_CONTROL,
    );
    res.write(xml);
  } catch {
    res.statusCode = 503;
    res.setHeader("Retry-After", "600");
    res.setHeader("Cache-Control", "no-store");
  }

  res.end();

  return { props: {} };
};

export default SitemapPage;
