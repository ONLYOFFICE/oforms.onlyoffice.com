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
import styles from "./Share.module.scss";

const Share = () => {
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
                style={
                  {
                    "--share-button-icon": `url(${getAssetUrl("/images/templates/form/hero/wechat.svg")})`,
                  } as React.CSSProperties
                }
              >
                <span className={styles["share-button-icon"]}></span>
              </Link>
            </li>
            <li className={styles["share-item"]}>
              <WeiboShareButton
                className={styles["share-button"]}
                url={routerUrl}
                style={
                  {
                    "--share-button-icon": `url(${getAssetUrl("/images/templates/form/hero/weibo.svg")})`,
                  } as React.CSSProperties
                }
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
