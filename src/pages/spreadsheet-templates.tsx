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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getExtForms } from "@src/lib/requests/getExtForms";
import { getExtFormsCount } from "@src/lib/requests/getExtFormsCount";
import { getCountriesCount } from "@src/lib/requests/getCountriesCount";
import { getPurposeWithCategoriesCount } from "@src/lib/requests/getPurposeWithCategoriesCount";
import { Layout } from "@src/components/Layout";
import { Head } from "@src/components/modules/Head";
import { Header } from "@src/components/modules/Header";
import { AdventAnnounce } from "@src/components/modules/AdventAnnounce";
import { Footer } from "@src/components/modules/Footer";
import { ExtCategoryTemplate } from "@src/components/templates/ExtCategory";
import { IExtCategory } from "@src/types/template";
import { ILocale } from "@src/types/locale";

const SpreadsheetTemplatesPage = ({
  locale,
  allForms,
  extFormsCount,
  countriesCount,
  purposeWithCategoriesCount,
}: IExtCategory & ILocale) => {
  const { t } = useTranslation("spreadsheet-templates");

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
        <ExtCategoryTemplate
          ext="xlsx"
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
};

export const getStaticProps = async ({ locale }: ILocale) => {
  const [allForms, extFormsCount, countriesCount, purposeWithCategoriesCount] =
    await Promise.all([
      getExtForms(locale),
      getExtFormsCount(locale),
      getCountriesCount(locale, "xlsx"),
      getPurposeWithCategoriesCount(locale, "xlsx"),
    ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "spreadsheet-templates",
        "MainTemplate",
        "SortSelector",
        "SearchInput",
      ])),
      locale,
      allForms,
      extFormsCount,
      countriesCount,
      purposeWithCategoriesCount,
    },
  };
};

export default SpreadsheetTemplatesPage;
