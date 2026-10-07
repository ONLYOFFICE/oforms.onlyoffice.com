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

import { IIcon } from "./types";

// cross-circle.svg
const CrossCircleIcon = ({ id, className, fill = "#444444" }: IIcon) => (
  <svg
    id={id}
    className={className}
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.4">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.31348 12C3.31348 7.0275 7.34098 3 12.3135 3C17.286 3 21.3135 7.0275 21.3135 12C21.3135 16.9725 17.286 21 12.3135 21C7.34098 21 3.31348 16.9725 3.31348 12ZM8.77772 9.87868C8.3872 9.48816 8.3872 8.85499 8.77772 8.46447C9.16825 8.07394 9.80141 8.07394 10.1919 8.46447L12.3133 10.5858L14.4346 8.46447C14.8251 8.07394 15.4583 8.07394 15.8488 8.46447C16.2393 8.85499 16.2393 9.48816 15.8488 9.87868L13.7275 12L15.8488 14.1213C16.2393 14.5118 16.2393 15.145 15.8488 15.5355C15.4583 15.9261 14.8251 15.9261 14.4346 15.5355L12.3133 13.4142L10.1919 15.5355C9.80141 15.9261 9.16825 15.9261 8.77772 15.5355C8.3872 15.145 8.3872 14.5118 8.77772 14.1213L10.899 12L8.77772 9.87868Z"
        fill={fill}
      />
    </g>
  </svg>
);

export { CrossCircleIcon };
