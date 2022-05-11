import { lazy, Suspense } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import reName from "@utils/helpers/fixname";

import Layout from "@components/layout";
import HeadSEO from "@components/screens/head-content";
import HeadingContent from "@components/screens/heading-content";
import MainInfo from "@components/screens/form-page/main";

const FormBanner = lazy(
  () => import("@components/screens/form-page/form-banner"),
  {
    loading: () => <div />,
  }
);
const Banner = lazy(() => import("@components/screens/common/banner"), {
  loading: () => <div />,
});
const Accordion = lazy(() => import("@components/screens/common/accordion"), {
  loading: () => <div />,
});
const Footer = lazy(() => import("@components/screens/footer-content"), {
  loading: () => <div />,
});

const Form = ({ form, locale }) => {
  const { t } = useTranslation("common");
  const data = form.data[0].attributes;
  const { seo_title, seo_description, name_form, file_oform } = data;
  const ID = form.data[0].id;
  const fileName = reName(name_form);
  const fillForm = `${file_oform.data[0].attributes.hash}.oform`;
  const linkOformEditor = `/editor/?filename=${fileName}&fillform=${fillForm}&id=${ID}`;
  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={seo_title}
          metaDescription={seo_description}
          metaDescriptionOg={seo_description}
          metaKeywords={seo_title}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
        <HeadingContent template currentLanguage={locale} t={t} />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <MainInfo data={data} currentLanguage={locale} t={t} />
        <Suspense>
          <FormBanner t={t} labelName={name_form} link={linkOformEditor} />
        </Suspense>
        {/* 

        <CarouselContent
          padding="112px 0 62px"
          tabletPadding="80px 0 30px"
          mobileLPadding="48px 0 0"
          data={randomCardForms}
          label={headingRentForms}
          currentLanguage={language}
          t={t}
        />
        {itemsClient !== null && parsedObjectLocalStorage?.length >= 2 ? (
          <CarouselContent
            padding="0 0 30px"
            tabletPadding="0 0 30px"
            mobileLPadding="0 0 0"
            data={itemsClient}
            label={headingRecentlyViewed}
            config={stateConfig}
            currentLanguage={language}
            t={t}
          />
        ) : (
          <div />
        )}
       */}
        <Suspense>
          <Banner t={t} currentLanguage={locale} />
        </Suspense>
        <Suspense>
          <Accordion t={t} currentLanguage={locale} />
        </Suspense>
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Suspense>
          <Footer t={t} language={locale} />
        </Suspense>
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, ...context }) => {
  const res = await fetch(
    `https://cmsoforms.onlyoffice.com/api/oforms?filters[url][$eq]=${context.query.form}&locale=${locale}&populate=template_image&populate=file_oform&populate=categories`
  );
  const form = await res.json();

  if (form.data.length === 0) {
    return {
      redirect: {
        destination: `https://oforms.teamlab.info/404`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      notFound: true,
      ...(await serverSideTranslations(locale, "common")),
      form,
      locale,
    },
  };
};

export default Form;
