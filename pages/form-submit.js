import { useTranslation } from "next-i18next";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import zlib from "zlib";
import getCategories from "@lib/requests/getCategories";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import Header from "@components/screens/header";
import AdventAnnounce from "@components/screens/header/advent-announce";
import FormSubmitContent from "@components/screens/form-submit-content";
import Footer from "@components/screens/footer";

const FormSubmitPage = ({ locale, categories, queryIndexData }) => {
  const { t } = useTranslation("common");
  const [stateMobile, setStateMobile] = useState(false);

  return (
    <Layout>
      <Layout.PageHead>
        <MainHead
          title={t("OFORMS – fill out forms online for free")}
          metaSiteNameOg={t("OFORM Library")}
          metaDescription={t("OFORMS – fill out forms online for free")}
          metaDescriptionOg={t("Try powerful ready-to-fill out free online forms. Create documens with forms online or just download templates in the desirable format: DOCXF, OFORM, or PDF.")}
          metaKeywords={t("OFORMS – fill out forms online for free")}
        />
      </Layout.PageHead>
      <AdventAnnounce t={t} locale={locale} stateMobile={stateMobile} />
      <Layout.PageHeader>
        <Header
          templatePrimary
          t={t}
          locale={locale}
          templateTertiary
          stateMobile={stateMobile}
          setStateMobile={setStateMobile}
        />
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
        <Footer t={t} locale={locale}/>
      </Layout.PageFooter>
    </Layout>
  )
};

export const getServerSideProps = async ({ locale, query, req, res }) => {
  const categories = await getCategories(locale === "pt" ? "pt-br" : locale);

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
    }
  };
}

export default FormSubmitPage;
