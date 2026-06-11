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

import { useTranslation } from "next-i18next";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCategoriesWithFormsCount } from "@/src/lib/requests/getCategoriesWithFormsCount";
import { getPopularForms } from "@src/lib/requests/getPopularForms";
import { getExtForms } from "@src/lib/requests/getExtForms";
import { getExtFormsCount } from "@src/lib/requests/getExtFormsCount";
import { getSubCategoryWithForms } from "@src/lib/requests/getSubCategoryWithForms";
import { getSubCategoryForms } from "@src/lib/requests/getSubCategoryForms";
import { getTypeWithSubCategoryForms } from "@src/lib/requests/getTypeWithSubCategoryForms";
import { TSortKey } from "@src/utils/sortMap";
import { parseListQuery } from "@src/utils/parseListQuery";
import { pickFirstTaxonomy } from "@src/utils/pickFirstTaxonomy";
import { Layout } from "@src/components/Layout";
import { Head } from "@src/components/modules/Head";
import { Header } from "@src/components/modules/Header";
import { AdventAnnounce } from "@src/components/modules/AdventAnnounce";
import { Footer } from "@src/components/modules/Footer";
import { MainTemplate, IMainTemplate } from "@src/components/templates/Main";
import { ILocale } from "@src/types/locale";

const MainPage = ({
  locale,
  popularForms,
  typeFormsCount,
  pptxForms,
  docxForms,
  pdfForms,
  xlsxForms,
  categories,
  types,
  compilations,
  salesTemplates,
  subCategoryForms,
  typeWithSubCategoryForms,
}: IMainTemplate & ILocale) => {
  const { t } = useTranslation("main");

  return (
    <Layout>
      <Layout.Head>
        <Head title={t("PageTitle")} description={t("PageDescription")} />
      </Layout.Head>
      <Layout.AdventAnnounce>
        <AdventAnnounce locale={locale} />
      </Layout.AdventAnnounce>
      <Layout.Header>
        <Header locale={locale} />
      </Layout.Header>
      <Layout.Main>
        <MainTemplate
          popularForms={popularForms}
          typeFormsCount={typeFormsCount}
          pptxForms={pptxForms}
          docxForms={docxForms}
          pdfForms={pdfForms}
          xlsxForms={xlsxForms}
          categories={categories}
          types={types}
          compilations={compilations}
          salesTemplates={salesTemplates}
          subCategoryForms={subCategoryForms}
          typeWithSubCategoryForms={typeWithSubCategoryForms}
        />
      </Layout.Main>
      <Layout.Footer>
        <Footer locale={locale} />
      </Layout.Footer>
    </Layout>
  );
};

export const getServerSideProps = async ({
  query,
  locale,
  resolvedUrl,
}: GetServerSidePropsContext & ILocale) => {
  const sortQuery = (query._sort as TSortKey) || "asc";
  const ALLOWED_TYPES = ["pptx", "docx", "pdf", "xlsx"];

  const typeQuery = parseListQuery(query.type, ALLOWED_TYPES);
  const categoriesQuery = parseListQuery(query.categories);
  const typesQuery = parseListQuery(query.types);
  const compilationsQuery = parseListQuery(query.compilations);
  const activeTaxonomy = pickFirstTaxonomy(resolvedUrl, {
    categories: categoriesQuery,
    types: typesQuery,
    compilations: compilationsQuery,
  });
  const activeTaxonomyValue = activeTaxonomy
    ? {
        categories: categoriesQuery,
        types: typesQuery,
        compilations: compilationsQuery,
      }[activeTaxonomy]
    : null;

  const [
    popularForms,
    typeFormsCount,
    pptxForms,
    docxForms,
    pdfForms,
    xlsxForms,
    categories,
    types,
    compilations,
    salesTemplates,
    subCategoryForms,
    typeWithSubCategoryForms,
  ] = await Promise.all([
    getPopularForms(
      locale,
      typeQuery,
      categoriesQuery,
      typesQuery,
      compilationsQuery,
      sortQuery,
      8,
      1,
    ),
    categoriesQuery || typesQuery || compilationsQuery || typeQuery
      ? getExtFormsCount(locale)
      : null,
    ...ALLOWED_TYPES.map((ext) =>
      !categoriesQuery &&
      !typesQuery &&
      !compilationsQuery &&
      (!typeQuery || typeQuery[0] === ext)
        ? getExtForms(locale, ext, sortQuery, 8, 1)
        : null,
    ),
    getCategoriesWithFormsCount(locale, "categories", "categorie", typeQuery),
    getCategoriesWithFormsCount(locale, "types", "type", typeQuery),
    getCategoriesWithFormsCount(
      locale,
      "compilations",
      "compilation",
      typeQuery,
    ),
    !Boolean(typeQuery || categoriesQuery || typesQuery || compilationsQuery)
      ? getSubCategoryWithForms(
          locale,
          "categories",
          "categorie",
          8,
          sortQuery,
          4,
        )
      : null,
    !typeQuery && activeTaxonomy
      ? getSubCategoryForms(
          locale,
          activeTaxonomy,
          activeTaxonomyValue![0],
          sortQuery,
          8,
          1,
        )
      : null,
    typeQuery && activeTaxonomy
      ? getTypeWithSubCategoryForms(
          locale,
          activeTaxonomy,
          typeQuery,
          activeTaxonomyValue![0],
          sortQuery,
          8,
          1,
        )
      : null,
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
      popularForms,
      typeFormsCount,
      pptxForms,
      docxForms,
      pdfForms,
      xlsxForms,
      categories,
      types,
      compilations,
      salesTemplates,
      typeWithSubCategoryForms,
      subCategoryForms,
    },
  };
};

export default MainPage;
