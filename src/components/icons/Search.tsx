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

// search.svg
const SearchIcon = ({ id, className, fill = "#9092A6" }: IIcon) => (
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.03707 10.0682C2.44123 14.1003 6.04352 17.0419 10.083 16.6385C10.9613 16.5508 11.7879 16.3122 12.5397 15.951C12.958 15.75 13.4661 15.8015 13.7949 16.1292L18.982 21.2983C19.3715 21.6865 20.0014 21.6873 20.3919 21.3001L21.2857 20.4139C21.6795 20.0234 21.6803 19.387 21.2874 18.9955L16.1218 13.8477C15.7889 13.5159 15.7388 12.9999 15.9471 12.5786C16.5353 11.3886 16.8074 10.025 16.6654 8.60736C16.2612 4.57526 12.6589 1.6336 8.6194 2.03699C4.57991 2.44039 1.6329 6.03607 2.03707 10.0682ZM4.12682 9.85949C4.41551 12.7396 6.98858 14.8407 9.87393 14.5526C12.7593 14.2645 14.8643 11.6961 14.5756 8.81605C14.2869 5.93598 11.7138 3.83479 8.82849 4.12293C5.94314 4.41107 3.83813 6.97941 4.12682 9.85949Z"
      fill={fill}
    />
  </svg>
);

export { SearchIcon };
