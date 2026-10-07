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

import { GetServerSidePropsContext } from "next";
import Script from "next/script";
import CONFIG from "@src/config/config.json";
import { Layout } from "@src/components/Layout";
import { Head } from "@src/components/modules/Head";
import { cmsLocale } from "@src/utils/cmsLocale";

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
  config: string;
}

const EditorPage = ({ filename, config }: IEditorPage) => {
  return (
    <Layout banner={false}>
      <Layout.Head>
        <Head title={filename} />
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
  const { lang, filename, fillform } = query;
  const locale = (Array.isArray(lang) ? lang[0] : lang) ?? "en";
  const cmsLang = cmsLocale(locale);
  const normalizedFilename =
    (Array.isArray(filename) ? filename[0] : filename) ?? "";
  const normalizedFillform =
    (Array.isArray(fillform) ? fillform[0] : fillform) ?? "";

  if (!normalizedFilename) {
    return {
      notFound: true,
    };
  }

  const oformsRes = await fetch(
    `${CONFIG.api.cms}/api/oforms?filters[url][$eq]=${encodeURIComponent(normalizedFilename)}&locale=${cmsLang}`,
  );
  if (!oformsRes.ok) {
    throw new Error(`Request failed with status ${oformsRes.status}`);
  }
  const oforms = await oformsRes.json();

  if (oforms.data.length === 0) {
    return {
      notFound: true,
    };
  }

  try {
    const configRes = await fetch(
      `${process.env.CONFIG_API_URL}/api/config?lang=${cmsLang}&title=${encodeURIComponent(normalizedFilename)}&url=${encodeURIComponent(normalizedFillform)}`,
    );
    if (!configRes.ok) {
      throw new Error(`Request failed with status ${configRes.status}`);
    }
    const config = await configRes.json();

    return {
      props: {
        filename: normalizedFilename,
        config: JSON.stringify(config),
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default EditorPage;
