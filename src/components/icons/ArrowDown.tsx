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

// arrow-down.svg
const ArrowDownIcon = ({ id, className }: IIcon) => (
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
      fill="#666980"
    />
  </svg>
);

export { ArrowDownIcon };
