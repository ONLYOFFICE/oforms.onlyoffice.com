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

import { useRouter } from "next/router";
import { OOHeader } from "onlyoffice-react-ui-kit/header";
import "onlyoffice-react-ui-kit/header/css";
import { languages } from "@src/config/languages";
import { IHeader } from "./Header.types";
import styles from "./Header.module.scss";

const Header = ({ locale, headerBgColor }: IHeader) => {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <OOHeader
        locale={locale}
        languages={languages.map((language) => ({
          key: language.shortKey,
          shortKey: language.shortKey,
          name: language.longKey,
          href:
            router.pathname === "/form-submit" ||
            router.pathname === "/searchresult" ||
            router.pathname === "/pdf-form-templates" ||
            router.pathname === "/document-templates" ||
            router.pathname === "/spreadsheet-templates" ||
            router.pathname === "/presentation-templates"
              ? router.asPath
              : "/",
        }))}
        base={{
          url: "https://www.onlyoffice.com",
          localePathMap: {
            ar: "",
          },
        }}
        phone={{
          show: true,
        }}
        backgroundColor={headerBgColor || "#ffffff"}
        highlight={{
          buttonId: "oo-menu-item-btn-products",
          linkId: "oo-menu-link-templates",
        }}
      />
    </div>
  );
};

export { Header };
