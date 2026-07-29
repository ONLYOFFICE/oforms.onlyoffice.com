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
