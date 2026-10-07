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

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllForms } from "@src/lib/requests/getAllForms";
import { Layout } from "@src/components/Layout";
import { Head } from "@src/components/modules/Head";
import { Header } from "@src/components/modules/Header";
import { AdventAnnounce } from "@src/components/modules/AdventAnnounce";
import { Footer } from "@src/components/modules/Footer";
import { MainTemplate, IMainTemplate } from "@src/components/templates/Main";
import { ILocale } from "@src/types/locale";

const MainPage = ({ locale, allForms }: IMainTemplate & ILocale) => {
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
      <Layout.Main background="var(--primary-background-color)">
        <MainTemplate allForms={allForms} />
      </Layout.Main>
      <Layout.Footer>
        <Footer locale={locale} />
      </Layout.Footer>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }: ILocale) => {
  const allForms = await getAllForms(locale);

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
      allForms,
    },
  };
};

export default MainPage;
