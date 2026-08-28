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
