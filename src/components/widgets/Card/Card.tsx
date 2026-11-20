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
import { useTranslation } from "next-i18next";
import { Link } from "@src/components/ui/Link";
import { Heading } from "@src/components/ui/Heading";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { LANG_QUERY_PARAM } from "@src/utils/queryLang";
import { TFormat } from "@src/types/data";
import { ICard } from "./Card.types";
import styles from "./Card.module.scss";

const hoverIconByFormat: Record<TFormat, string> = {
  docx: getAssetUrl("/images/widgets/card/docx-hover.png"),
  xlsx: getAssetUrl("/images/widgets/card/xlsx-hover.png"),
  pptx: getAssetUrl("/images/widgets/card/pptx-hover.png"),
  pdf: getAssetUrl("/images/widgets/card/pdf-hover.png"),
};

const Card = ({
  className,
  preview,
  format,
  heading,
  description,
  url,
  locale,
  skeleton,
}: ICard) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const path = url?.startsWith("/") ? url : `/${url}`;
  const formLocale = locale ?? lang;
  const href =
    formLocale === lang ? path : `${path}?${LANG_QUERY_PARAM}=${lang}`;

  return (
    <Link
      href={url ? href : undefined}
      locale={url ? formLocale : undefined}
      lang={formLocale}
      className={clsx(
        styles.card,
        styles[`card-${format}`],
        skeleton && styles["card-skeleton"],
        className,
      )}
      textUnderline={false}
      style={
        {
          [`--card-hover-icon-${format}`]: `url(${hoverIconByFormat[format]})`,
        } as React.CSSProperties
      }
    >
      <div className={styles["card-preview-wrapper"]}>
        <div className={styles["card-preview"]}>
          {preview && (
            <img
              className={styles["card-preview-image"]}
              src={preview}
              alt={heading}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <span
          className={clsx(
            styles["card-format"],
            styles[`card-format-${format}`],
          )}
        >
          <span>{format}</span>
        </span>
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
