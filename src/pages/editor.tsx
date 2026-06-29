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

  const oformsRes = await fetch(
    `${CONFIG.api.cms}/api/oforms?filters[url][$eq]=${filename}&locale=${cmsLang}`,
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
      `${CONFIG.api.cms}/api/config?lang=${cmsLang}&title=${filename}&url=${fillform}`,
    );
    if (!configRes.ok) {
      throw new Error(`Request failed with status ${configRes.status}`);
    }
    const config = await configRes.json();

    return {
      props: {
        filename,
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
