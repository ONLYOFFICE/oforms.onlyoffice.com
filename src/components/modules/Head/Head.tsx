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
  locales,
}: IHead) => {
  const canonical = getCanonicalUrl(path, locale);
  const hreflangs = buildHreflangs(path, localized && !noindex, locales);

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
