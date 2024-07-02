import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import ErrorContent from "@components/screens/404-content";

const Error404Page = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const isDesktopClient = router.asPath.includes("desktop=true");
  const theme = router.asPath.includes("theme=theme-light") ? "theme-light" : 
    router.asPath.includes("theme=theme-dark") ? "theme-dark" : 
    router.asPath.includes("theme=theme-contrast-dark") ? "theme-contrast-dark" : null;

  return (
    <Layout>
      <Layout.PageHead>
        <MainHead
          title={t("Page 404")}
          description={t("Page 404")}
        />
      </Layout.PageHead>
      <Layout.SectionMain>
        <ErrorContent
          t={t}
          heading={t("404 Error!")}
          text={t("It seems you clicked on an invalid link, or entered an address that is not on this website")}
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
    }
  }
}

export default Error404Page;
