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

// cross.svg
const CrossIcon = ({ id, className, fill = "#7A7D94" }: IIcon) => (
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
      d="M15.2875 7.29044C15.678 6.89996 16.3149 6.90383 16.7055 7.29435C17.096 7.68486 17.0998 8.32179 16.7094 8.71231L13.4213 11.9994L16.7094 15.2875C17.0997 15.678 17.0959 16.315 16.7055 16.7055C16.315 17.0959 15.678 17.0997 15.2875 16.7094L11.9994 13.4213L8.71229 16.7094C8.32176 17.0997 7.68479 17.0959 7.29433 16.7055C6.90386 16.315 6.90009 15.6781 7.29042 15.2875L10.5785 11.9994L7.29042 8.71231C6.89998 8.32178 6.90383 7.68484 7.29433 7.29435C7.68482 6.90385 8.32176 6.9 8.71229 7.29044L11.9994 10.5785H12.0004L15.2875 7.29044Z"
      fill={fill}
    />
  </svg>
);

export { CrossIcon };
