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

import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { ChevronDownIcon } from "@src/components/icons";
import { Badge } from "@src/components/ui/Badge";
import { Switch } from "@src/components/ui/Switch";
import {
  COLLAPSE_QUERY_PARAM,
  EXPAND_QUERY_PARAM,
  parseQueryList,
  VISIBLE_SUBCATEGORIES_LIMIT,
} from "@src/utils/queryFilters";
import { ISidebarItem } from "./SidebarItem.types";
import styles from "./SidebarItem.module.scss";

const SidebarItem = ({
  heading,
  count,
  text,
  options,
  categories,
  optionsType = "badge",
  type = "checkbox",
  isSub = false,
  queryKey,
  collapseQueryKey,
  collapseQueryParam = COLLAPSE_QUERY_PARAM,
  defaultOpen = true,
  defaultOpenKeys = [],
}: ISidebarItem) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();

  const [isOpenState, setIsOpen] = useState(defaultOpen);

  const showAllOptions =
    !!queryKey &&
    parseQueryList(router.query[EXPAND_QUERY_PARAM]).includes(queryKey);

  const collapseParam = router.query[collapseQueryParam];

  const getIsOpen = () => {
    if (!collapseQueryKey) return isOpenState;
    if (collapseParam === undefined) return defaultOpen;
    return parseQueryList(collapseParam).includes(collapseQueryKey);
  };

  const isOpen = getIsOpen();
  const isSwitch = !isSub && optionsType === "switch";
  const showCount = !isSub && !isSwitch && !!count;
  const OptionComponent = isSwitch ? Switch : Badge;

  const isCollapsible =
    isSub && !!queryKey && (options?.length ?? 0) > VISIBLE_SUBCATEGORIES_LIMIT;
  const visibleOptions =
    isCollapsible && !showAllOptions
      ? options?.slice(0, VISIBLE_SUBCATEGORIES_LIMIT)
      : options;
  const hiddenCount = isCollapsible
    ? (options?.length ?? 0) - VISIBLE_SUBCATEGORIES_LIMIT
    : 0;

  const toggleId = (ids: string[], key: string, include: boolean) => {
    const rest = ids.filter((item) => item !== key);
    return include ? [...rest, key] : rest;
  };

  const writeQueryList = (param: string, ids: string[], keepEmpty = false) => {
    const query = { ...router.query };
    if (ids.length > 0 || keepEmpty) {
      query[param] = ids.join(",");
    } else {
      delete query[param];
    }

    router.push({ query }, undefined, { scroll: false, shallow: true });
  };

  const toggleShowAllOptions = (showAll: boolean) => {
    if (!queryKey) return;
    writeQueryList(
      EXPAND_QUERY_PARAM,
      toggleId(
        parseQueryList(router.query[EXPAND_QUERY_PARAM]),
        queryKey,
        showAll,
      ),
    );
  };

  const toggleIsOpen = () => {
    const next = !isOpen;

    if (collapseQueryKey) {
      const current =
        collapseParam === undefined
          ? defaultOpenKeys
          : parseQueryList(collapseParam);
      writeQueryList(
        collapseQueryParam,
        toggleId(current, collapseQueryKey, next),
        true,
      );
      return;
    }

    setIsOpen(next);
  };

  return (
    <div
      className={clsx(
        styles["sidebar-item"],
        isSub && styles["sidebar-item-sub"],
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        className={clsx(
          styles["sidebar-item-header"],
          isSub && styles["sidebar-item-header-sub"],
          !isSub &&
            categories &&
            !options &&
            styles["sidebar-item-header-with-categories"],
        )}
        onClick={toggleIsOpen}
      >
        <span
          className={clsx(
            styles["sidebar-item-header-heading"],
            isSub && styles["sidebar-item-header-heading-sub"],
          )}
        >
          {heading}
        </span>
        {showCount && (
          <span className={styles["sidebar-item-header-count"]}>{count}</span>
        )}
        <ChevronDownIcon
          className={clsx(
            styles["sidebar-item-header-icon"],
            isOpen && styles["sidebar-item-header-icon-open"],
          )}
          fill="var(--sidebar-item-chevron-down-icon-color)"
        />
      </button>

      {isOpen && (
        <>
          {text && <div className={styles["sidebar-item-text"]}>{text}</div>}
          {options && (
            <div className={styles["sidebar-item-options"]}>
              {visibleOptions?.map((option) => (
                <OptionComponent
                  key={option.value}
                  name={heading}
                  value={option.value}
                  count={option.count}
                  checked={option.checked}
                  onChange={option.onChange}
                  skeleton
                  {...(isSwitch ? {} : { type })}
                >
                  {option.label}
                </OptionComponent>
              ))}

              {isCollapsible && !showAllOptions && (
                <button
                  type="button"
                  className={styles["sidebar-item-options-btn"]}
                  onClick={() => toggleShowAllOptions(true)}
                >
                  +{hiddenCount}
                </button>
              )}

              {isCollapsible && showAllOptions && (
                <button
                  type="button"
                  className={styles["sidebar-item-show-less-btn"]}
                  onClick={() => toggleShowAllOptions(false)}
                >
                  {t("ShowLess")}
                </button>
              )}
            </div>
          )}
          {categories?.map((category) => (
            <SidebarItem
              key={category.heading}
              isSub
              defaultOpen={category.defaultOpen ?? false}
              heading={category.heading}
              options={category.options}
              type={type}
              queryKey={category.queryKey}
              collapseQueryKey={category.collapseQueryKey ?? category.queryKey}
              collapseQueryParam={category.collapseQueryParam}
              defaultOpenKeys={categories.flatMap((item) =>
                item.defaultOpen && item.queryKey ? [item.queryKey] : [],
              )}
            />
          ))}
        </>
      )}
    </div>
  );
};

export { SidebarItem };
