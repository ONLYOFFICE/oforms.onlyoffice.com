import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import config from "@config/config.json";
import getCompilations from "@lib/requests/getCompilations";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import Header from "@components/screens/header";
import AdventAnnounce from "@components/screens/header/advent-announce";
import FormContent from "@components/screens/form-content";
import BannerFormSection from "@components/screens/common/banner-form-section";
import AccordionSection from "@components/screens/common/accordion-section";
import Footer from "@components/screens/footer";

const FormPage = ({ locale, form, randomCarousel, compilations }) => {
  const { t } = useTranslation("common");
  const [stateMobile, setStateMobile] = useState(false);
  const [recentForms, setRecentForms] = useState([]);
  const seoTitle = form.data[0].attributes.seo_title ? form.data[0].attributes.seo_title : form.data[0].attributes.name_form;
  const seoDescription = form.data[0].attributes.seo_description ? form.data[0].attributes.seo_description : form.data[0].attributes.description_card;

  useEffect(() => {
    const localStorageKey = `recentForms_${locale}`;
    const maxForms = 7;

    let recentForms = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    const formData = {
      id: form.data[0].id,
      url: form.data[0].attributes.url ? form.data[0].attributes.url : null,
      card_prewiew: form.data[0].attributes.card_prewiew.data.attributes.url ? form.data[0].attributes.card_prewiew.data.attributes.url : null,
      name_form: form.data[0].attributes.name_form ? form.data[0].attributes.name_form : null
    };

    recentForms = recentForms.filter((f) => f.id !== formData.id);
    recentForms.unshift(formData);
    recentForms = recentForms.slice(0, maxForms);
    setRecentForms(recentForms);

    localStorage.setItem(localStorageKey, JSON.stringify(recentForms));
  }, [form, locale]);

  return (
    <Layout>
      <Layout.PageHead>
        <MainHead
          title={`${seoTitle} | ONLYOFFICE`}
          description={seoDescription}
        />
      </Layout.PageHead>
      <AdventAnnounce t={t} locale={locale} stateMobile={stateMobile} />
      <Layout.PageHeader>
        <Header
          t={t}
          templatePrimary
          locale={locale}
          stateMobile={stateMobile}
          setStateMobile={setStateMobile}
        />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <FormContent
          t={t}
          locale={locale}
          form={form}
          randomCarousel={randomCarousel}
          recentForms={recentForms}
          compilations={compilations}
        />
        <BannerFormSection t={t} locale={locale} />
        <AccordionSection t={t} />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} locale={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, ...context }) => {
  const cms = config.api.cms;
  const res = await fetch(`${cms}/api/oforms/?filters[url][$eq]=${context.query.form}&locale=${locale === "pt" ? "pt-br" : locale}&populate=template_image&populate=card_prewiew&populate=file_oform&populate=form_exts`);
  const form = await res.json();
  const randomCarouselItems = await fetch(`${cms}/api/oforms/?locale=${locale === "pt" ? "pt-br" : locale}&pagination[pageSize]=7&pagination[page]=2&populate=card_prewiew`);
  const randomCarousel = await randomCarouselItems.json();
  const compilations = await getCompilations(locale === "pt" ? "pt-br" : locale);

  if (form.data.length === 0) {
    return {
      notFound: true
    };
  };

  return {
    props: {
      ...(await serverSideTranslations(locale, "common")),
      locale,
      form,
      randomCarousel,
      compilations
    },
  };
};

export default FormPage;
