import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Layout from "@components/layout";
import HeadSEO from "@src/screens/head-content";
import Error404 from "@src/screens/404-page";

const ErrorPage = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const isDesktopClient = router.asPath.includes("desktop=true");
  const theme = router.asPath.includes("theme=theme-light") ? "theme-light" : 
    router.asPath.includes("theme=theme-dark") ? "theme-dark" : 
    router.asPath.includes("theme=theme-contrast-dark") ? "theme-contrast-dark" : null;

  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={t("Page 404")}
          metaSiteNameOg={t("Page 404")}
          metaDescription={t("Page 404")}
          metaDescriptionOg={t("Page 404")}
        />
      </Layout.PageHead>
      <Layout.SectionMain>
        <Error404
          t={t}
          heading={t("404Error!")}
          text={t("404Descdription")}
          isDesktopClient={isDesktopClient}
          theme={theme}
        />
      </Layout.SectionMain>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, "common"))
    },
  }
}

export default ErrorPage;
