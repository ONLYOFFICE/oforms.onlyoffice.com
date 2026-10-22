import { GetServerSideProps } from "next";
import { buildRobotsTxt } from "@src/lib/server/buildRobots";
import { DEFAULT_LOCALE } from "@src/utils/seoUrl";

const RobotsPage = () => null;

export const getServerSideProps: GetServerSideProps = async ({
  res,
  locale,
}) => {
  if (locale !== DEFAULT_LOCALE) return { notFound: true };

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  );
  res.write(buildRobotsTxt());
  res.end();

  return { props: {} };
};

export default RobotsPage;
