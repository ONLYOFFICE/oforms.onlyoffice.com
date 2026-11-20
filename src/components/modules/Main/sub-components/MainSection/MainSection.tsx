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
import { useRouter } from "next/router";
import { Heading } from "@src/components/ui/Heading";
import { Link } from "@src/components/ui/Link";
import { Card } from "@src/components/widgets/Card";
import { COUNTRIES_COLLAPSE_QUERY_PARAM } from "@src/utils/queryFilters";
import { appendQueryParams } from "./MainSection.utils";
import { IMainSection } from "./MainSection.types";
import styles from "./MainSection.module.scss";

const MainSection = ({
  label,
  href,
  data,
  desktopLimit,
  cardsGrid,
}: IMainSection) => {
  const router = useRouter();
  const hrefWithQuery = appendQueryParams(href, {
    [COUNTRIES_COLLAPSE_QUERY_PARAM]:
      router.query[COUNTRIES_COLLAPSE_QUERY_PARAM],
    country: router.query.country,
    sort: router.query.sort,
  });

  return (
    <div className={styles["main-section"]}>
      {href ? (
        <Link
          href={hrefWithQuery}
          className={styles["main-section-heading-link"]}
        >
          <Heading
            className={styles["main-section-heading"]}
            level={2}
            size={3}
            color="var(--main-section-heading-color)"
          >
            {label}
          </Heading>
        </Link>
      ) : (
        <div className={styles["main-section-heading-link"]}>
          <Heading
            className={styles["main-section-heading"]}
            level={2}
            size={3}
            color="var(--main-section-heading-color)"
          >
            {label}
          </Heading>
        </div>
      )}

      <div
        className={clsx(
          styles["main-section-cards"],
          desktopLimit && styles["main-section-cards-desktop-limit"],
          cardsGrid && styles["main-section-cards-grid"],
        )}
      >
        {data?.map((item) => (
          <Card
            key={item.id}
            className={styles["main-section-card"]}
            preview={item.preview}
            format={item.format}
            heading={item.name_form}
            description={item.description_card}
            url={item.url}
            locale={item.locale}
            skeleton
          />
        ))}
      </div>
    </div>
  );
};

export { MainSection };
