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

// filters.svg
const FiltersIcon = ({ id, className, fill = "#444444" }: IIcon) => (
  <svg
    id={id}
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17H4C3.44772 17 3 17.4477 3 18ZM3 12.0526C3 12.6049 3.44772 13.0526 4 13.0526H20C20.5523 13.0526 21 12.6049 21 12.0526V12C21 11.4477 20.5523 11 20 11H4C3.44772 11 3 11.4477 3 12V12.0526ZM4 5C3.44772 5 3 5.44772 3 6V6.05263C3 6.60492 3.44772 7.05263 4 7.05263H20C20.5523 7.05263 21 6.60492 21 6.05263V6C21 5.44772 20.5523 5 20 5H4Z"
      fill={fill}
    />
    <rect x="7" y="4" width="2" height="4" fill={fill} />
    <rect x="15" y="10" width="2" height="4" fill={fill} />
    <rect x="7" y="16" width="2" height="4" fill={fill} />
  </svg>
);

export { FiltersIcon };
