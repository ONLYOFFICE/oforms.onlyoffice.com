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

import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCategoriesWithFormsCount } from "@/src/lib/requests/getCategoriesWithFormsCount";
import { getSubCategoryPopularForms } from "@src/lib/requests/getSubCategoryPopularForms";
import { getExtFormsCount } from "@src/lib/requests/getExtFormsCount";
import { getCategoryForms } from "@src/lib/requests/getCategoryForms";
import { getCategoryInfo } from "@src/lib/requests/getCategoryInfo";
import { TSortKey } from "@src/utils/sortMap";
import { Layout } from "@src/components/Layout";
import { Head } from "@src/components/modules/Head";
import { Header } from "@src/components/modules/Header";
import { AdventAnnounce } from "@src/components/modules/AdventAnnounce";
import { Footer } from "@src/components/modules/Footer";
import {
  ISubCategoryPage,
  SubCategoryTemplate,
} from "@src/components/templates/SubCategory";
import { ILocale } from "@src/types/locale";

const FormCompilationPage = ({
  locale,
  popularForms,
  typeFormsCount,
  categories,
  types,
  compilations,
  categoryForms,
  categoryInfo,
}: ISubCategoryPage<"compilation"> & ILocale) => {
  const seoTitle =
    categoryInfo.data[0]?.attributes.seo_title ||
    categoryInfo.data[0]?.attributes.compilation;
  const seoDescription =
    categoryInfo.data[0]?.attributes.seo_description ||
    categoryInfo.data[0]?.attributes.header_description;

  return (
    <Layout>
      <Layout.Head>
        <Head title={seoTitle} description={seoDescription} />
      </Layout.Head>
      <Layout.AdventAnnounce>
        <AdventAnnounce locale={locale} />
      </Layout.AdventAnnounce>
      <Layout.Header>
        <Header locale={locale} />
      </Layout.Header>
      <Layout.Main>
        <SubCategoryTemplate
          popularForms={popularForms}
          typeFormsCount={typeFormsCount}
          categories={categories}
          types={types}
          compilations={compilations}
          categoryForms={categoryForms}
          categoryId={categoryInfo.data[0]?.id}
          categoryName={categoryInfo.data[0]?.attributes.compilation}
          categoryRelation="compilations"
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
}: GetServerSidePropsContext & ILocale) => {
  const sortQuery = (query._sort as TSortKey) || "asc";
  const urlReq = query.compilation;

  const [
    popularForms,
    typeFormsCount,
    categories,
    types,
    compilations,
    categoryForms,
    categoryInfo,
  ] = await Promise.all([
    getSubCategoryPopularForms(
      locale,
      "compilations",
      urlReq as string,
      sortQuery,
      8,
      1,
    ),
    getExtFormsCount(locale),
    getCategoriesWithFormsCount(locale, "categories", "categorie", []),
    getCategoriesWithFormsCount(locale, "types", "type", []),
    getCategoriesWithFormsCount(locale, "compilations", "compilation", []),
    getCategoryForms(locale, "compilations", urlReq as string, sortQuery, 8, 1),
    getCategoryInfo(locale, "compilations", urlReq as string, "compilation"),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "MainTemplate",
        "SortSelector",
        "SearchInput",
      ])),
      locale,
      popularForms,
      typeFormsCount,
      categories,
      types,
      compilations,
      categoryForms,
      categoryInfo,
    },
  };
};

export default FormCompilationPage;
