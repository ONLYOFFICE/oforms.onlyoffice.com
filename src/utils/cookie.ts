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

type TCookieOptions = {
  path?: string;
  domain?: string;
  expires?: Date | string;
  "max-age"?: number;
  secure?: boolean;
  samesite?: "strict" | "lax" | "none";
  [key: string]: string | number | boolean | Date | undefined;
};

const setCookie = (
  cookieName: string,
  cookieValue: string,
  hourToExpire: number,
): void => {
  const date = new Date();
  date.setTime(date.getTime() + hourToExpire * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  const tmpCookie =
    cookieName + "=" + cookieValue + "; " + expires + "; path=/";
  document.cookie = tmpCookie;
};

const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setLngCookie = (
  name: string,
  value: string,
  options: TCookieOptions | null = null,
): void => {
  const normalizedOptions: TCookieOptions = {
    path: "/",
    ...options,
  };

  if (normalizedOptions.expires instanceof Date) {
    normalizedOptions.expires = normalizedOptions.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (const optionKey in normalizedOptions) {
    updatedCookie += "; " + optionKey;
    const optionValue = normalizedOptions[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export { getCookie, setCookie, setLngCookie };
