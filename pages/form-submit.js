import { lazy, Suspense } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import zlib from "zlib";
import getAllCategories from "@lib/strapi/getCategories";
import Layout from "@components/layout";
import HeadSEO from "../src/screens/head-content";
import HeadingContent from "../src/screens/heading-content";
import AdventAnnounce from "../src/screens/heading-content/advent-announce";
import FormSubmitContent from "../src/screens/form-submit-content";

const Footer = lazy(() => import("../src/screens/footer-content"), {
  loading: () => <div />,
});

const FormSubmit = ({ locale, categories, queryIndexData }) => {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={t("titleIndexPage")}
          metaSiteNameOg={t("metaSiteNameOg")}
          metaDescription={t("titleIndexPage")}
          metaDescriptionOg={t("metaDescriptionOgIndexPage")}
          metaKeywords={t("metaKeywordsIndexPage")}
        />
      </Layout.PageHead>
      <Layout.PageAnnounce>
        <AdventAnnounce currentLanguage={locale} />
      </Layout.PageAnnounce>
      <Layout.PageHeader>
        <HeadingContent currentLanguage={locale} template isInvert templateForm />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <FormSubmitContent
          t={t}
          locale={locale}
          categories={categories}
          queryIndexData={queryIndexData}
        />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Suspense>
          <Footer language={locale} />
        </Suspense>
      </Layout.PageFooter>
    </Layout>
  )
};

export const getServerSideProps = async ({ locale, query, req, res }) => {
  const categories = await getAllCategories(locale);

  const queryResult = await new Promise(async (resolve) => {
    if (query.index) {
      const compressedData = Buffer.from(query.index.replace(/\s/g, "+"), "base64");
      const originalString = zlib.inflateSync(compressedData).toString();
      const queryIndexData = originalString.split(";");

      const pngConvertUrlResponse = await fetch(queryIndexData[0]);

      if (!(pngConvertUrlResponse.status === 200 && req.cookies.imageUpload === queryIndexData[0])) {
        res.setHeader("Set-Cookie", "imageUpload=; Max-Age=0");
        res.setHeader("Set-Cookie", "formSubmit=; Max-Age=0");
      };

      resolve(pngConvertUrlResponse.status === 200 && queryIndexData);
    } else {
      resolve(false);
    };
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      categories,
      queryIndexData: queryResult === false ? null : queryResult
    },
  };
}


export default FormSubmit;
