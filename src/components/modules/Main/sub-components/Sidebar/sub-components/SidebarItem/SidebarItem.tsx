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

import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { ArrowDownIcon } from "@src/components/icons";
import { Badge } from "./sub-components/Badge";
import { Switch } from "./sub-components/Switch";
import { ISidebarItem } from "./SidebarItem.types";
import styles from "./SidebarItem.module.scss";

const VISIBLE_OPTIONS_LIMIT = 3;

const SidebarItem = ({
  heading,
  count,
  text,
  options,
  categories,
  optionsType = "badge",
  isSub = false,
  queryKey,
}: ISidebarItem) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();

  const parseOpened = () => {
    const param = router.query.opened;
    return param ? String(param).split(",").filter(Boolean) : [];
  };

  const isOpenedInQuery = !!queryKey && parseOpened().includes(queryKey);

  const [isOpen, setIsOpen] = useState(true);
  const [showAllOptions, setShowAllOptions] = useState(isOpenedInQuery);
  const isSwitch = !isSub && optionsType === "switch";
  const showCount = !isSub && !isSwitch && !!count;
  const OptionComponent = isSwitch ? Switch : Badge;

  const isCollapsible = isSub && (options?.length ?? 0) > VISIBLE_OPTIONS_LIMIT;
  const visibleOptions =
    isCollapsible && !showAllOptions
      ? options?.slice(0, VISIBLE_OPTIONS_LIMIT)
      : options;
  const hiddenCount = isCollapsible
    ? (options?.length ?? 0) - VISIBLE_OPTIONS_LIMIT
    : 0;

  const setOpenedInQuery = (opened: boolean) => {
    if (!queryKey) return;

    const current = parseOpened().filter((key) => key !== queryKey);
    const ids = opened ? [...current, queryKey] : current;

    const query = { ...router.query };
    if (ids.length > 0) {
      query.opened = ids.join(",");
    } else {
      delete query.opened;
    }

    router.push({ pathname: router.pathname, query }, undefined, {
      scroll: false,
    });
  };

  const toggleShowAllOptions = (showAll: boolean) => {
    setShowAllOptions(showAll);
    setOpenedInQuery(showAll);
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
          !isSub && categories && styles["sidebar-item-header-with-categories"],
        )}
        onClick={() => setIsOpen((prev) => !prev)}
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
        <ArrowDownIcon
          className={clsx(
            styles["sidebar-item-header-icon"],
            isOpen && styles["sidebar-item-header-icon-open"],
            isSub && styles["sidebar-item-header-icon-sub"],
          )}
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
                  count={option.count}
                  checked={option.checked}
                  onChange={option.onChange}
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
              heading={category.heading}
              options={category.options}
              queryKey={category.queryKey}
            />
          ))}
        </>
      )}
    </div>
  );
};

export { SidebarItem };
