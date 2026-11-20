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

import { IFavicon } from "./Head.types";

export const PRELOADED_FONTS = [
  "/fonts/Sora/Sora-Regular.woff2",
  "/fonts/Sora/Sora-SemiBold.woff2",
  "/fonts/Sora/Sora-Bold.woff2",
];

export const FAVICONS: IFavicon[] = [
  {
    rel: "icon",
    sizes: "16x16",
    href: "/images/logo/favicons/favicon.png",
    type: "image/png",
  },
  {
    rel: "icon",
    sizes: "32x32",
    href: "/images/logo/favicons/favicon32.png",
    type: "image/png",
  },
  {
    rel: "icon",
    sizes: "64x64",
    href: "/images/logo/favicons/favicon64.png",
    type: "image/png",
  },
  {
    rel: "icon",
    sizes: "96x96",
    href: "/images/logo/favicons/favicon.ico",
    type: "image/x-icon",
  },
  {
    rel: "apple-touch-icon",
    sizes: "150x150",
    href: "/images/logo/favicons/apple150.png",
    type: "image/png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "310x310",
    href: "/images/logo/favicons/apple310.png",
    type: "image/png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "325x325",
    href: "/images/logo/favicons/apple325.png",
    type: "image/png",
  },
];
