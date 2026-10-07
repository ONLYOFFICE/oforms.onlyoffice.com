/*
 * Copyright (C) Ascensio System SIA, 2009-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation, together with the
 * additional terms provided in the LICENSE file.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For
 * details, see the GNU AGPL at: https://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA by email at info@onlyoffice.com
 * or by postal mail at 20A-6 Ernesta Birznieka-Upisha Street, Riga,
 * LV-1050, Latvia, European Union.
 *
 * The interactive user interfaces in modified versions of the Program
 * are required to display Appropriate Legal Notices in accordance with
 * Section 5 of the GNU AGPL version 3.
 *
 * No trademark rights are granted under this License.
 *
 * All non-code elements of the Product, including illustrations,
 * icon sets, and technical writing content, are licensed under the
 * Creative Commons Attribution-ShareAlike 4.0 International License:
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * This license applies only to such non-code elements and does not
 * modify or replace the licensing terms applicable to the Program's
 * source code, which remains licensed under the GNU Affero General
 * Public License v3.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { GetStaticPaths, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllFormUrls } from "@src/lib/requests/getAllFormUrls";
import {
  getCategoryUrls,
  getCachedCategoryUrls,
} from "@src/lib/requests/getCategoryUrls";
import { getCategoryInfoWithForms } from "@src/lib/requests/getCategoryInfoWithForms";
import { getExtForms } from "@src/lib/requests/getExtForms";
import { getExtFormsCount } from "@src/lib/requests/getExtFormsCount";
import { getCountriesCount } from "@src/lib/requests/getCountriesCount";
import { getPurposeWithCategoriesCount } from "@src/lib/requests/getPurposeWithCategoriesCount";
import { getForm } from "@src/lib/requests/getForm";
import { getExtFormsPlain } from "@src/lib/requests/getExtFormsPlain";
import { getParentCategories } from "@src/lib/requests/getParentCategories";
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
  ({ isCategory: true } & ICategory) | ({ isCategory?: false } & IFormTemplate);

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
        <Layout.Main background="var(--primary-background-color)">
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

  const { form, allForms, categories } = props;

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
      <Layout.Main background="var(--primary-background-color)">
        <FormTemplate form={form} allForms={allForms} categories={categories} />
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

  const categoryUrls = await getCachedCategoryUrls(locale);
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

  const [form, allForms, categories] = await Promise.all([
    getForm(locale, slug),
    getExtFormsPlain(locale),
    getParentCategories(locale),
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
      allForms,
      categories,
    },
  };
};

export default SlugPage;
