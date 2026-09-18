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
