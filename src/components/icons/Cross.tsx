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
