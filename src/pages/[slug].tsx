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

import { useEffect, useLayoutEffect } from "react";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCatalog, getTemplates } from "@src/lib/requests/getTemplates";
import { categoryName, categorySeo } from "@src/lib/server/catalogNames";
import {
  buildCategoryView,
  buildFormNames,
  resolveCategoryFilters,
} from "@src/lib/server/buildMainView";
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
import { LANG_QUERY_PARAM } from "@src/utils/queryLang";
import { clearLangPending } from "@src/utils/langPending";
import { siteCta } from "@src/utils/siteCta";
import { extOf } from "@src/utils/templateFiles";

const LOCALES: string[] = languages.map(({ shortKey }) => shortKey);

const resolveLang = (
  value: string | string[] | null | undefined,
  fallback: string,
): string => {
  const raw = (Array.isArray(value) ? value[0] : value)?.toLowerCase();
  return raw && LOCALES.includes(raw) ? raw : fallback;
};

const useQueryLang = (enabled = true) => {
  const { i18n } = useTranslation();
  const { locale, query, isReady } = useRouter();
  const lang = resolveLang(query[LANG_QUERY_PARAM], locale ?? "en");
  const currentLanguage = i18n?.language;
  const shouldSwitch =
    enabled &&
    !!locale &&
    lang !== locale &&
    !!i18n?.hasResourceBundle(lang, "form");

  useLayoutEffect(() => {
    if (!shouldSwitch || !locale) return;

    i18n.changeLanguage(lang);

    return () => {
      i18n.changeLanguage(locale);
    };
  }, [shouldSwitch, i18n, lang, locale]);

  useEffect(() => {
    if (isReady && (!shouldSwitch || currentLanguage === lang)) {
      clearLangPending();
    }
  }, [isReady, shouldSwitch, currentLanguage, lang]);
};

type ISlugPage =
  | ({
      isCategory: true;
      categoryInfo: { title: string; description: string };
      categoryLocales: string[];
    } & ICategory)
  | ({ isCategory?: false } & IFormTemplate);

const SlugPage = (props: ISlugPage & ILocale) => {
  const { locale } = props;
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useQueryLang(!props.isCategory);

  if (props.isCategory) {
    const {
      categoryInfo,
      initialView,
      initialFormNames,
      categoryUrlReq,
      categoryLocales,
    } = props;

    return (
      <Layout>
        <Layout.Head>
          <Head
            title={categoryInfo.title}
            description={categoryInfo.description}
            path={`/${categoryUrlReq}`}
            locale={locale}
            localized
            locales={categoryLocales}
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
            initialView={initialView}
            initialFormNames={initialFormNames}
            categoryUrlReq={categoryUrlReq}
          />
        </Layout.Main>
        <Layout.Footer>
          <Footer locale={locale} />
        </Layout.Footer>
      </Layout>
    );
  }

  const { template, categories, cta } = props;
  const { meta } = template;
  const formPath = `/${meta.slug}`;
  const title = `${meta["seo-title"] || meta["card-title"]} | ONLYOFFICE`;
  const description = meta["seo-description"] || meta["card-text"];

  return (
    <Layout>
      <Layout.Head>
        <Head
          title={title}
          description={description}
          path={formPath}
          locale={locale}
        />
      </Layout.Head>
      <Layout.AdventAnnounce>
        <AdventAnnounce locale={lang} />
      </Layout.AdventAnnounce>
      <Layout.Header>
        <Header locale={lang} resetPathOnLocaleChange />
      </Layout.Header>
      <Layout.Main background="var(--primary-background-color)">
        <FormTemplate template={template} categories={categories} cta={cta} />
      </Layout.Main>
      <Layout.Footer>
        <Footer locale={lang} resetPathOnLocaleChange />
      </Layout.Footer>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = languages.map((language) => language.shortKey);

  const templatesByLocale = await Promise.all(
    locales.map((locale) => getTemplates(locale)),
  );

  const formPaths = templatesByLocale.flatMap((templates, index) =>
    templates.map((template) => ({
      params: { slug: template.meta.slug },
      locale: locales[index],
    })),
  );

  const categoryPaths = templatesByLocale.flatMap((templates, index) =>
    [...new Set(templates.map(({ meta }) => meta.category))].map(
      (category) => ({
        params: { slug: category },
        locale: locales[index],
      }),
    ),
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

  const allForms = await getCatalog(locale);
  const isCategory = allForms.some(
    (form) => form.locale === locale && form.meta.category === slug,
  );

  if (isCategory) {
    // Category slugs are the same in every locale, so the page exists wherever
    // that catalog has the category.
    const categoryLocales = [
      ...new Set(
        allForms
          .filter(({ meta }) => meta.category === slug)
          .map((form) => form.locale),
      ),
    ];

    const filters = resolveCategoryFilters(allForms, slug, {
      locale,
      type: [],
      country: [],
      sort: undefined,
    });

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          "common",
          "main",
          "MainTemplate",
          "SortSelector",
          "SearchInput",
          "NoResultsFound",
        ])),
        locale,
        isCategory: true,
        categoryInfo: categorySeo(locale, slug) ?? {
          title: categoryName(locale, slug),
          description: "",
        },
        initialView: buildCategoryView(allForms, slug, filters),
        initialFormNames: buildFormNames(allForms, locale, []),
        categoryUrlReq: slug,
        categoryLocales,
      },
    };
  }

  const templates = await getTemplates(locale);
  const template = templates.find(({ meta }) => meta.slug === slug);

  if (!template) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "form", "embed"],
        null,
        languages.map((language) => language.shortKey),
      )),
      locale,
      template,
      cta: siteCta(locale, template.meta["card-title"], extOf(template)),
      categories: [...new Set(templates.map(({ meta }) => meta.category))],
    },
  };
};

export default SlugPage;
