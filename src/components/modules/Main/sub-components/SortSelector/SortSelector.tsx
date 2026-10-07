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

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { ChevronDownIcon } from "@src/components/icons";
import { ISortSelector, TSortOption } from "./SortSelector.types";
import styles from "./SortSelector.module.scss";

const SORT_OPTIONS: TSortOption[] = [
  { key: "popular", label: "MostPopular" },
  { key: "asc", label: "NewestOldest" },
  { key: "desc", label: "OldestNewest" },
  { key: "name_asc", label: "A-Z" },
  { key: "name_desc", label: "Z-A" },
];

const DEFAULT_SORT_KEY = SORT_OPTIONS[1].key;

const SortSelector = ({ className }: ISortSelector) => {
  const { t } = useTranslation("SortSelector");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const queryKey = Array.isArray(router.query.sort)
    ? router.query.sort[0]
    : router.query.sort;
  const isValidKey = SORT_OPTIONS.some((option) => option.key === queryKey);
  const selectedKey = isValidKey ? (queryKey as string) : DEFAULT_SORT_KEY;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
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
      { pathname: router.pathname, query: { ...router.query, sort: key } },
      undefined,
      {
        scroll: false,
        shallow: true,
      },
    );
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={clsx(styles["sort-selector"], className)}>
      <span className={styles["sort-selector-label"]}>{t("SortBy")}</span>

      <div className={styles["sort-selector-wrapper"]}>
        <button
          type="button"
          className={styles["sort-selector-button"]}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles["sort-selector-button-text"]}>
            {t(selected.label)}
          </span>
          <ChevronDownIcon
            className={clsx(
              styles["sort-selector-button-icon"],
              isOpen && styles["sort-selector-button-icon-open"],
            )}
            fill="var(--sort-selector-chevron-down-icon-color)"
          />
        </button>

        {isOpen && (
          <ul className={styles["sort-selector-dropdown"]}>
            {SORT_OPTIONS.map((option) => (
              <li key={option.key}>
                <button
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export { SortSelector };
