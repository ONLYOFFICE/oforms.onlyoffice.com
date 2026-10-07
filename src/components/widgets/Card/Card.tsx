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

import clsx from "clsx";
import { Link } from "@src/components/ui/Link";
import { Heading } from "@src/components/ui/Heading";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { TFormat } from "@src/types/data";
import { ICard, TCardStorage } from "./Card.types";
import styles from "./Card.module.scss";

const hoverIconByFormat: Record<TFormat, string> = {
  docx: getAssetUrl("/images/widgets/card/docx-hover.png"),
  xlsx: getAssetUrl("/images/widgets/card/xlsx-hover.png"),
  pptx: getAssetUrl("/images/widgets/card/pptx-hover.png"),
  pdf: getAssetUrl("/images/widgets/card/pdf-hover.png"),
};

const storageIcon: Record<TCardStorage, string> = {
  local: getAssetUrl("/images/widgets/card/local.svg"),
  cloud: getAssetUrl("/images/widgets/card/cloud.svg"),
};

const Card = ({
  className,
  preview,
  format,
  heading,
  description,
  url,
  storage,
}: ICard) => {
  return (
    <Link
      href={url ? (url.startsWith("/") ? url : `/${url}`) : "#"}
      className={clsx(styles.card, styles[`card-${format}`], className)}
      textUnderline={false}
      style={
        {
          [`--card-hover-icon-${format}`]: `url(${hoverIconByFormat[format]})`,
        } as React.CSSProperties
      }
    >
      <div className={styles["card-preview-wrapper"]}>
        <div
          className={styles["card-preview"]}
          style={
            {
              "--card-preview-image": preview ? `url(${preview})` : "none",
            } as React.CSSProperties
          }
        />
        <div className={styles["card-preview-footer"]}>
          <span
            className={clsx(
              styles["card-format"],
              styles[`card-format-${format}`],
            )}
          >
            <span>{format}</span>
          </span>
          {storage && (
            <span
              className={styles["card-storage"]}
              style={
                {
                  "--card-storage-icon": `url(${storageIcon[storage]})`,
                } as React.CSSProperties
              }
            />
          )}
        </div>
      </div>
      <div>
        <Heading
          className={styles["card-heading"]}
          level={3}
          color="var(--card-heading-color)"
        >
          {heading}
        </Heading>
        <p className={styles["card-description"]}>{description}</p>
      </div>
    </Link>
  );
};

export { Card };
