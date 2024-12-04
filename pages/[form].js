import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getForm from "@lib/requests/getForm";
import getRandomForms from "@lib/requests/getRandomForms";
import getCategories from "@lib/requests/getCategories";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";
import Header from "@components/screens/header";
import AdventAnnounceBanner from "@components/screens/header/advent-announce-banner";
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
    <Layout locale={locale}>
      <Layout.PageHead>
        <MainHead
          title={`${seoTitle} | ONLYOFFICE`}
          description={seoDescription}
        />
      </Layout.PageHead>
      <AdventAnnounceBanner locale={locale} stateMobile={stateMobile} />
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
        <AccordionSection t={t} locale={locale} />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer locale={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, ...context }) => {
  const form = await getForm(locale, context.query.form);
  const randomCarousel = await getRandomForms(locale, form.data[0].attributes.form_exts.data[0].attributes.ext);
  const compilations = await getCategories(locale, "compilations", "compilation");

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
