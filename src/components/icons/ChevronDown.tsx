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

// chevron-down.svg
const ChevronDownIcon = ({ id, className, fill = "#666980" }: IIcon) => (
  <svg
    id={id}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.32308 9.28982C6.71602 8.90178 7.35104 8.90372 7.74202 9.29372L12.0018 13.5427L16.2567 9.29861C16.6476 8.90853 17.2836 8.90665 17.6766 9.2947L17.7039 9.32204C18.0968 9.71011 18.0988 10.3412 17.7078 10.7312L12.7225 15.7039C12.5483 15.8777 12.3257 15.9735 12.0975 15.9929C11.8067 16.0225 11.5053 15.9276 11.283 15.7058L6.29183 10.7254C5.90118 10.3353 5.90297 9.70514 6.29573 9.31716L6.32308 9.28982Z"
      fill={fill}
    />
  </svg>
);

export { ChevronDownIcon };
