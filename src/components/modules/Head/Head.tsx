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

import NextHead from "next/head";
import { IHead } from "./Head.types";
import { FAVICONS, PRELOADED_FONTS } from "./Head.data";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import {
  getCanonicalUrl,
  buildHreflangs,
  DEFAULT_LOCALE,
} from "@src/utils/seoUrl";

const Head = ({
  title,
  description,
  path,
  locale = DEFAULT_LOCALE,
  noindex = false,
  localized = false,
}: IHead) => {
  const canonical = getCanonicalUrl(path, locale);
  const hreflangs = buildHreflangs(path, localized && !noindex);

  return (
    <NextHead>
      <meta charSet="utf-8" />
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <meta name="google" content="notranslate" />

      {PRELOADED_FONTS.map((font) => (
        <link
          key={font}
          rel="preload"
          href={font}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}

      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="max-snippet:-1, max-image-preview:large" />
      )}

      {!noindex && (
        <>
          {canonical && <link rel="canonical" href={canonical} />}

          <meta property="og:type" content="website" />
          {title && <meta property="og:title" content={title} />}
          {description && (
            <meta property="og:description" content={description} />
          )}
          {canonical && <meta property="og:url" content={canonical} />}
          <meta
            property="og:image"
            content={getAssetUrl("/images/logo/logo-325x325.jpg")}
          />
        </>
      )}

      {hreflangs.map(({ hrefLang, href }) => (
        <link
          key={`alternate-${hrefLang}`}
          rel="alternate"
          hrefLang={hrefLang}
          href={href}
        />
      ))}

      {FAVICONS.map(({ rel, sizes, href, type }) => (
        <link
          key={`${rel}-${sizes}`}
          rel={rel}
          sizes={sizes}
          href={getAssetUrl(href)}
          type={type}
        />
      ))}
    </NextHead>
  );
};

export { Head };
