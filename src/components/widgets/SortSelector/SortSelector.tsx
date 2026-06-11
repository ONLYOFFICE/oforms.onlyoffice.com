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

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { ArrowDownIcon } from "@src/components/icons/ArrowDown";
import { TSortOption } from "./SortSelector.types";
import styles from "./SortSelector.module.scss";

const SORT_OPTIONS: TSortOption[] = [
  { key: "popular", label: "MostPopular" },
  { key: "asc", label: "NewestOldest" },
  { key: "desc", label: "OldestNewest" },
  { key: "name_asc", label: "A-Z" },
  { key: "name_desc", label: "Z-A" },
];

const DEFAULT_SORT_KEY = SORT_OPTIONS[1].key;

const SortSelector = () => {
  const { t } = useTranslation("SortSelector");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const queryKey = Array.isArray(router.query._sort)
    ? router.query._sort[0]
    : router.query._sort;
  const isValidKey = SORT_OPTIONS.some((option) => option.key === queryKey);
  const selectedKey = isValidKey ? (queryKey as string) : DEFAULT_SORT_KEY;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selected =
    SORT_OPTIONS.find((option) => option.key === selectedKey) ??
    SORT_OPTIONS[1];

  const handleSelect = (key: string) => {
    router.push(
      { pathname: router.pathname, query: { ...router.query, _sort: key } },
      undefined,
      {
        scroll: false,
      },
    );
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={styles["sort-selector"]}>
      <span className={styles["sort-selector-label"]}>{t("SortBy")}</span>

      <div className={styles["sort-selector-wrapper"]}>
        <button
          type="button"
          className={styles["sort-selector-button"]}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {t(selected.label)}
          <ArrowDownIcon
            className={clsx(
              styles["sort-selector-button-icon"],
              isOpen && styles["sort-selector-button-icon-open"],
            )}
          />
        </button>

        {isOpen && (
          <div className={styles["sort-selector-dropdown"]}>
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                className={clsx(
                  styles["sort-selector-option"],
                  option.key === selectedKey &&
                    styles["sort-selector-option-active"],
                )}
                onClick={() => handleSelect(option.key)}
              >
                {t(option.label)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { SortSelector };
