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

import { randomBytes } from "crypto";
import { GetServerSidePropsContext } from "next";
import Script from "next/script";
import jwt from "jsonwebtoken";
import CONFIG from "@src/config/config.json";
import { Layout } from "@src/components/Layout";
import { Head } from "@src/components/modules/Head";
import { cmsLocale } from "@src/utils/editorLang";
import { getTemplates } from "@src/lib/requests/getTemplates";
import { extOf, fileName, fileUrl } from "@src/utils/templateFiles";
import { getSiteUrl } from "@src/utils/seoUrl";
import { TFormat } from "@src/types/data";
import { languages } from "@src/config/languages";
import { ILocale } from "@src/types/locale";

const LOCALES = languages.map(({ shortKey }) => shortKey);

const resolveEditorLocale = (
  value: string | string[] | undefined,
  fallback: ILocale["locale"],
): ILocale["locale"] => {
  const raw = Array.isArray(value) ? value[0] : value;

  return raw && LOCALES.includes(raw) ? (raw as ILocale["locale"]) : fallback;
};

const DOCUMENT_TYPES: Record<TFormat, string> = {
  docx: "word",
  xlsx: "cell",
  pptx: "slide",
  pdf: "pdf",
};

const FILENAME_MAX_LENGTH = 300;
const FILENAME_PATTERN = /^[a-zA-Z0-9._-]+$/;

declare global {
  interface Window {
    DocsAPI: {
      DocEditor: new (id: string, config: object) => unknown;
    };
    docEditor: unknown;
  }
}

interface IEditorPage {
  filename: string;
  title: string;
  config: string;
}

const EditorPage = ({ filename, title, config }: IEditorPage) => {
  return (
    <Layout banner={false}>
      <Layout.Head>
        <Head title={`${title} | ONLYOFFICE`} noindex />
        <Script
          id="doc-editor"
          src={`${CONFIG.docEditorUrl}/web-apps/apps/api/documents/api.js`}
          onReady={() => {
            window.docEditor = new window.DocsAPI.DocEditor(
              filename,
              JSON.parse(config),
            );
          }}
        />
      </Layout.Head>
      <div
        style={{
          position: "fixed",
          top: "0",
          width: "100vw",
          height: "100vh",
          zIndex: "1001",
        }}
      >
        <div id={filename} style={{ height: "100%" }} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { lang, formlang, filename } = query;
  const locale = resolveEditorLocale(lang, "en");
  const formLocale = resolveEditorLocale(formlang, locale);
  const cmsLang = cmsLocale(locale);
  const normalizedFilename =
    (Array.isArray(filename) ? filename[0] : filename) ?? "";

  if (
    !normalizedFilename ||
    normalizedFilename.length > FILENAME_MAX_LENGTH ||
    !FILENAME_PATTERN.test(normalizedFilename)
  ) {
    return {
      notFound: true,
    };
  }

  const template = (await getTemplates(formLocale)).find(
    ({ meta }) => meta.slug === normalizedFilename,
  );

  if (!template) {
    return {
      notFound: true,
    };
  }

  const secret = process.env.FILES_DOCSERVICE_SECRET;
  if (!secret) throw new Error("FILES_DOCSERVICE_SECRET is not set");

  const ext = extOf(template);
  const config = {
    document: {
      // A fresh key per visit: a shared one would put strangers filling the same
      // form into one co-editing session.
      key: `${ext}_${randomBytes(16).toString("hex")}`,
      fileType: ext,
      title: fileName(template),
      url: fileUrl(template),
      permissions: { edit: false, fillForms: true },
    },
    editorConfig: {
      callbackUrl: `${getSiteUrl()}/api/editor-callback`,
      lang: cmsLang,
      customization: { anonymous: { request: false } },
      coEditing: { mode: "strict", change: false },
    },
    documentType: DOCUMENT_TYPES[ext],
    height: "100%",
    width: "100%",
  };

  return {
    props: {
      filename: normalizedFilename,
      title: template.meta["card-title"],
      config: JSON.stringify({ ...config, token: jwt.sign(config, secret) }),
    },
  };
};

export default EditorPage;
