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

import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./Pagination.module.scss";

interface IPaginationProps {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}

/** Page numbers around the current one, with gaps collapsed to an ellipsis. */
function pageItems(page: number, pages: number): (number | "gap")[] {
  if (pages <= 7) {
    return Array.from({ length: pages }, (_, i) => i + 1);
  }

  const items = new Set<number>([1, pages, page]);
  if (page - 1 > 1) items.add(page - 1);
  if (page + 1 < pages) items.add(page + 1);
  if (page <= 3) [2, 3, 4].forEach((n) => items.add(n));
  if (page >= pages - 2) [pages - 3, pages - 2, pages - 1].forEach((n) => items.add(n));

  const sorted = Array.from(items)
    .filter((n) => n >= 1 && n <= pages)
    .sort((a, b) => a - b);

  const result: (number | "gap")[] = [];
  sorted.forEach((n, index) => {
    if (index > 0 && n - sorted[index - 1] > 1) result.push("gap");
    result.push(n);
  });
  return result;
}

const Pagination = ({ page, pages, onChange }: IPaginationProps) => {
  const { t } = useTranslation("embed");

  // "if needed" — a single page needs no controls.
  if (pages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label={t("Templates")}>
      <button
        type="button"
        className={styles["pagination-arrow"]}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label={t("Previous")}
      >
        ‹
      </button>

      {pageItems(page, pages).map((item, index) =>
        item === "gap" ? (
          <span key={`gap-${index}`} className={styles["pagination-gap"]}>
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={clsx(
              styles["pagination-page"],
              item === page && styles["pagination-page-active"],
            )}
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className={styles["pagination-arrow"]}
        onClick={() => onChange(page + 1)}
        disabled={page >= pages}
        aria-label={t("Next")}
      >
        ›
      </button>
    </nav>
  );
};

export { Pagination };
