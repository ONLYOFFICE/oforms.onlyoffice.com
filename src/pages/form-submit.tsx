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

import type { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import zlib from "zlib";
import { createHash } from "crypto";
import { parse as parseCookie, serialize as serializeCookie } from "cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCountries } from "@src/lib/requests/getCountries";
import { getPurposeWithCategories } from "@src/lib/requests/getPurposeWithCategories";
import { getTemplatePreviewImages } from "@src/lib/requests/getTemplatePreviewImages";
import { Layout } from "@src/components/Layout";
import { Head } from "@src/components/modules/Head";
import { Header } from "@src/components/modules/Header";
import { AdventAnnounce } from "@src/components/modules/AdventAnnounce";
import { Footer } from "@src/components/modules/Footer";
import {
  FormSubmitTemplate,
  IFormSubmitTemplate,
} from "@src/components/templates/FormSubmit";
import { ILocale } from "@src/types/locale";

const FormSubmitPage = ({
  locale,
  countries,
  purposeWithCategories,
  queryIndexData,
}: IFormSubmitTemplate & ILocale) => {
  const { t } = useTranslation("form-submit");

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
      <Layout.Main background="var(--form-submit-background-color)">
        <FormSubmitTemplate
          countries={countries}
          purposeWithCategories={purposeWithCategories}
          queryIndexData={queryIndexData}
        />
      </Layout.Main>
      <Layout.Footer>
        <Footer locale={locale} />
      </Layout.Footer>
    </Layout>
  );
};

const INDEX_USED_COOKIE = "formSubmitIndexUsed";
const hashIndex = (index: string) =>
  createHash("sha256").update(index).digest("hex");

const resolveQueryIndexData = async (
  query: GetServerSidePropsContext["query"],
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"],
) => {
  const index = query.index;

  if (typeof index !== "string" || index.length === 0) {
    return null;
  }

  const indexHash = hashIndex(index);
  const usedIndexHash = parseCookie(req.headers.cookie ?? "")[
    INDEX_USED_COOKIE
  ];

  if (usedIndexHash === indexHash) {
    return null;
  }

  try {
    const compressedData = Buffer.from(index.replace(/\s/g, "+"), "base64");
    const queryIndexData = JSON.parse(
      zlib.inflateSync(compressedData).toString(),
    );
    const previewUrl = queryIndexData.previewUrl;

    if (typeof previewUrl !== "string" || previewUrl.length === 0) {
      return null;
    }

    const templateImages = await getTemplatePreviewImages(previewUrl);

    if (!templateImages) {
      return null;
    }

    res.setHeader(
      "Set-Cookie",
      serializeCookie(INDEX_USED_COOKIE, indexHash, {
        path: "/form-submit",
        httpOnly: true,
        sameSite: "lax",
      }),
    );

    return {
      fileName: queryIndexData.fileName,
      fileSize: queryIndexData.fileSize,
      formName: queryIndexData.formName,
      fileUrl: queryIndexData.fileUrl,
      templateImages,
    };
  } catch {
    return null;
  }
};

export const getServerSideProps = async ({
  locale,
  query,
  req,
  res,
}: GetServerSidePropsContext) => {
  const resolvedLocale = locale ?? "en";

  const [countries, purposeWithCategories, queryIndexData] = await Promise.all([
    getCountries(resolvedLocale),
    getPurposeWithCategories(resolvedLocale),
    resolveQueryIndexData(query, req, res),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(resolvedLocale, [
        "common",
        "form-submit",
        "Select",
      ])),
      locale,
      countries,
      purposeWithCategories,
      queryIndexData,
    },
  };
};

export default FormSubmitPage;
