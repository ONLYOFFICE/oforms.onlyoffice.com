/*
 * (c) Copyright Ascensio System SIA 2009-2026
 *
 * This program is a free software product.
 * You can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
 * Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
 * to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
 * any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
 * the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions of the Program must
 * display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product logo when
 * distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
 * trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
 * content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
 * International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 */

import { GetStaticPaths, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllFormUrls } from "@src/lib/requests/getAllFormUrls";
import { getCategoryUrls } from "@src/lib/requests/getCategoryUrls";
import { getCategoryInfoWithForms } from "@src/lib/requests/getCategoryInfoWithForms";
import { getExtForms } from "@src/lib/requests/getExtForms";
import { getExtFormsCount } from "@src/lib/requests/getExtFormsCount";
import { getCountriesCount } from "@src/lib/requests/getCountriesCount";
import { getPurposeWithCategoriesCount } from "@src/lib/requests/getPurposeWithCategoriesCount";
import { getForm } from "@src/lib/requests/getForm";
import { getCategories } from "@src/lib/requests/getCategories";
import { languages } from "@src/config/languages";
import { Layout } from "@src/components/Layout";
import { Head } from "@src/components/modules/Head";
import { Header } from "@src/components/modules/Header";
import { AdventAnnounce } from "@src/components/modules/AdventAnnounce";
import { Footer } from "@src/components/modules/Footer";
import { CategoryTemplate } from "@src/components/templates/Category";
import { ICategory } from "@src/types/template";
import { FormTemplate, IFormTemplate } from "@src/components/templates/Form";
import { ILocale } from "@src/types/locale";

type ISlugPage =
  | ({ isCategory: true } & ICategory)
  | ({ isCategory?: false } & IFormTemplate);

const SlugPage = (props: ISlugPage & ILocale) => {
  const { locale } = props;

  if (props.isCategory) {
    const {
      categoryInfoWithForms,
      allForms,
      extFormsCount,
      countriesCount,
      purposeWithCategoriesCount,
    } = props;

    return (
      <Layout>
        <Layout.Head>
          <Head
            title={categoryInfoWithForms.data[0].seo_title}
            description={categoryInfoWithForms.data[0].seo_description}
          />
        </Layout.Head>
        <Layout.AdventAnnounce>
          <AdventAnnounce locale={locale} />
        </Layout.AdventAnnounce>
        <Layout.Header>
          <Header locale={locale} />
        </Layout.Header>
        <Layout.Main>
          <CategoryTemplate
            categoryInfoWithForms={categoryInfoWithForms}
            allForms={allForms}
            extFormsCount={extFormsCount}
            countriesCount={countriesCount}
            purposeWithCategoriesCount={purposeWithCategoriesCount}
          />
        </Layout.Main>
        <Layout.Footer>
          <Footer locale={locale} />
        </Layout.Footer>
      </Layout>
    );
  }

  const { form, categories } = props;

  return (
    <Layout>
      <Layout.Head>
        <Head
          title={form.data[0].seo_title || form.data[0].name_form}
          description={
            form.data[0].seo_description || form.data[0].description_card
          }
        />
      </Layout.Head>
      <Layout.AdventAnnounce>
        <AdventAnnounce locale={locale} />
      </Layout.AdventAnnounce>
      <Layout.Header>
        <Header locale={locale} />
      </Layout.Header>
      <Layout.Main>
        <FormTemplate form={form} categories={categories} />
      </Layout.Main>
      <Layout.Footer>
        <Footer locale={locale} />
      </Layout.Footer>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = languages.map((language) => language.shortKey);

  const [formsByLocale, categoriesByLocale] = await Promise.all([
    Promise.all(locales.map((locale) => getAllFormUrls(locale))),
    Promise.all(locales.map((locale) => getCategoryUrls(locale))),
  ]);

  const formPaths = formsByLocale.flatMap((forms, index) =>
    forms.data
      .filter((form) => typeof form.url === "string" && form.url.length > 0)
      .map((form) => ({
        params: { slug: form.url },
        locale: locales[index],
      })),
  );

  const categoryPaths = categoriesByLocale.flatMap((categories, index) =>
    categories.data
      .filter(
        (category) =>
          typeof category.urlReq === "string" && category.urlReq.length > 0,
      )
      .map((category) => ({
        params: { slug: category.urlReq },
        locale: locales[index],
      })),
  );

  return {
    paths: [...formPaths, ...categoryPaths],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
  locale,
}: GetStaticPropsContext & ILocale) => {
  const slug = params?.slug as string;

  const categoryUrls = await getCategoryUrls(locale);
  const isCategory = categoryUrls.data.some(
    (category) => category.urlReq === slug,
  );

  if (isCategory) {
    const [
      categoryInfoWithForms,
      allForms,
      extFormsCount,
      countriesCount,
      purposeWithCategoriesCount,
    ] = await Promise.all([
      getCategoryInfoWithForms(locale, slug),
      getExtForms(locale),
      getExtFormsCount(locale),
      getCountriesCount(locale),
      getPurposeWithCategoriesCount(locale),
    ]);

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          "common",
          "main",
          "MainTemplate",
          "SortSelector",
          "SearchInput",
        ])),
        locale,
        isCategory: true,
        categoryInfoWithForms,
        allForms,
        extFormsCount,
        countriesCount,
        purposeWithCategoriesCount,
      },
    };
  }

  const [form, categories] = await Promise.all([
    getForm(locale, slug),
    getCategories(locale),
  ]);

  if (form.data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "form"])),
      locale,
      form,
      categories,
    },
  };
};

export default SlugPage;
