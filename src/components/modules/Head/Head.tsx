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
import { languages } from "@src/config/languages";
import { getAssetUrl } from "@src/utils/getAssetUrl";

const Head = ({ title, description }: IHead) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta property="og:type" content="website" />
      <meta id="ctl00_MetaTitleOG" property="og:title" content={title} />
      <meta
        id="ctl00_MetaDescriptionOG"
        property="og:description"
        content={description}
      />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
      <meta
        id="ctl00_MetaImageOG"
        property="og:image"
        content="https://static.onlyoffice.com/studio/tag/personal.11.5.3/skins/default/images/logo/fb_icon_325x325.jpg"
      />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=3, shrink-to-fit=no, viewport-fit=cover"
      />
      <meta id="ctl00_MetaKeywords" name="keywords" content={title} />
      <meta name="description" content={description} />
      <meta name="google" content="notranslate" />

      {[
        "/fonts/Sora/Sora-Regular.woff2",
        "/fonts/Sora/Sora-SemiBold.woff2",
        "/fonts/Sora/Sora-Bold.woff2",
      ].map((font) => (
        <link
          key={font}
          rel="preload"
          href={getAssetUrl(font)}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}

      <link
        rel="shortcut icon"
        sizes="16x16"
        href={getAssetUrl("/images/logo/favicons/favicon.png")}
        type="image/png"
      />
      <link
        rel="shortcut icon"
        sizes="32x32"
        href={getAssetUrl("/images/logo/favicons/favicon32.png")}
        type="image/png"
      />
      <link
        rel="shortcut icon"
        sizes="64x64"
        href={getAssetUrl("/images/logo/favicons/favicon64.png")}
        type="image/png"
      />
      <link
        rel="icon"
        sizes="96x96"
        href={getAssetUrl("/images/logo/favicons/favicon.ico")}
        type="image/x-icon"
      />
      <link
        rel="apple-touch-icon"
        sizes="150x150"
        href={getAssetUrl("/images/logo/favicons/apple150.png")}
        type="image/png"
      />
      <link
        rel="apple-touch-icon"
        sizes="310x310"
        href={getAssetUrl("/images/logo/favicons/apple310.png")}
        type="image/png"
      />
      <link
        rel="apple-touch-icon"
        sizes="325x325"
        href={getAssetUrl("/images/logo/favicons/apple325.png")}
        type="image/png"
      />

      {languages.map((lng) => {
        const { key, shortKey } = lng;
        const href = `${process.env.NEXT_PUBLIC_SITE_URL}${shortKey === "en" ? "" : `/${shortKey}`}`;

        return (
          <link key={key} rel="alternate" hrefLang={shortKey} href={href} />
        );
      })}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={process.env.NEXT_PUBLIC_SITE_URL}
      />
    </NextHead>
  );
};

export { Head };
