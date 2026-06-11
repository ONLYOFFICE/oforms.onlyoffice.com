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

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import clsx from "clsx";
import {
  EmailShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  WeiboShareButton,
} from "react-share";
import { Link } from "@src/components/ui/Link";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { IShare } from "./Share.types";
import styles from "./Share.module.scss";

const Share = ({}: IShare) => {
  const { t } = useTranslation("form");
  const router = useRouter();
  const locale = router.locale;
  const routerUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${locale === "en" ? "" : `/${locale}`}${router.asPath}`;

  return (
    <div className={styles["share"]}>
      <span className={styles["share-heading"]}>{t("Share")}</span>

      <ul className={styles["share-list"]}>
        <li className={styles["share-item"]}>
          <EmailShareButton className={styles["share-button"]} url={routerUrl}>
            <span
              className={clsx(
                styles["share-button-icon"],
                styles["share-button-icon-mail"],
              )}
              style={
                {
                  "--share-button-icon": `url(${getAssetUrl("/images/templates/form/hero/mail.svg")})`,
                } as React.CSSProperties
              }
            ></span>
          </EmailShareButton>
        </li>
        <li className={styles["share-item"]}>
          <LinkedinShareButton
            className={styles["share-button"]}
            url={routerUrl}
          >
            <span
              className={styles["share-button-icon"]}
              style={
                {
                  "--share-button-icon": `url(${getAssetUrl("/images/templates/form/hero/linkedin.svg")})`,
                } as React.CSSProperties
              }
            ></span>
          </LinkedinShareButton>
        </li>
        <li className={styles["share-item"]}>
          <FacebookShareButton
            className={styles["share-button"]}
            url={routerUrl}
          >
            <span
              className={styles["share-button-icon"]}
              style={
                {
                  "--share-button-icon": `url(${getAssetUrl("/images/templates/form/hero/facebook.svg")})`,
                } as React.CSSProperties
              }
            ></span>
          </FacebookShareButton>
        </li>
        {locale === "zh" && (
          <>
            <li className={styles["share-item"]}>
              <Link
                className={styles["share-button"]}
                href={`https://www.shareaholic.com/share/wechat/?link=${routerUrl}`}
              >
                <span className={styles["share-button-icon"]}></span>
              </Link>
            </li>
            <li className={styles["share-item"]}>
              <WeiboShareButton
                className={styles["share-button"]}
                url={routerUrl}
              >
                <span className={styles["share-button-icon"]}></span>
              </WeiboShareButton>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export { Share };
