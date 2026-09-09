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

import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useDropdown } from "../../hooks/useDropdown";
import { ChevronIcon, FiltersIcon } from "../icons";
import type { ICategoryCount, ICountry } from "../../types";
import styles from "./FilterPopover.module.scss";

interface IFilterPopoverProps {
  countries: (ICountry & { count: number })[];
  categories: ICategoryCount[];
  selectedCountries: string[];
  selectedCategories: string[];
  hasFilters: boolean;
  onToggleCountry: (value: string) => void;
  onToggleCategory: (value: string) => void;
  onClearAll: () => void;
}

interface ICheckProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Check = ({ label, checked, onChange }: ICheckProps) => (
  <label className={clsx(styles.check, checked && styles["check-checked"])}>
    <input
      type="checkbox"
      className={styles["check-input"]}
      checked={checked}
      onChange={onChange}
    />
    <span className={styles["check-label"]}>{label}</span>
  </label>
);

const Group = ({
  title,
  children,
  showHeader,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  showHeader: boolean;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!showHeader) return <div className={styles["group-body"]}>{children}</div>;

  return (
    <section className={styles.group}>
      <button
        type="button"
        className={styles["group-header"]}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title}
        <ChevronIcon open={isOpen} />
      </button>
      {isOpen && <div className={styles["group-body"]}>{children}</div>}
    </section>
  );
};

/**
 * Anchored to its own button and deliberately not modal: every tick changes the
 * result set, and the grid has to stay visible for that to be worth anything.
 */
const FilterPopover = ({
  countries,
  categories,
  selectedCountries,
  selectedCategories,
  hasFilters,
  onToggleCountry,
  onToggleCategory,
  onClearAll,
}: IFilterPopoverProps) => {
  const { t } = useTranslation("MainTemplate");
  const { t: tEmbed } = useTranslation("embed");
  const { isOpen, setIsOpen, ref } = useDropdown();
  const panelId = useId();

  // A row that would return nothing is not offered — 11 of the 17 categories
  // are empty inside Presentations. A checked one stays, or switching type
  // would drop an active filter out of sight and leave the grid unexplained.
  const visibleCategories = categories.filter(
    (category) =>
      category.count > 0 || selectedCategories.includes(category.urlReq),
  );

  // Countries is the only group that could ever join Categories, so one fact
  // decides both: the button already says Filters, and a lone group heading
  // below it is a redundant row.
  const showCountries = countries.length > 1;

  return (
    <div className={styles.filters} ref={ref}>
      <button
        type="button"
        className={clsx(styles.trigger, hasFilters && styles["trigger-active"])}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <FiltersIcon />
        {tEmbed("Filters")}
      </button>

      {isOpen && (
        <div
          id={panelId}
          className={styles.menu}
          role="group"
          aria-label={tEmbed("Filters")}
        >
          <div className={styles["menu-body"]}>
            {visibleCategories.length > 0 && (
              <Group title={t("Сategories")} showHeader={showCountries}>
                {visibleCategories.map((category) => (
                  <Check
                    key={category.id}
                    label={category.name}
                    checked={selectedCategories.includes(category.urlReq)}
                    onChange={() => onToggleCategory(category.urlReq)}
                  />
                ))}
              </Group>
            )}

            {/*
             * Every locale currently ships exactly one country, carried by every
             * template in it — a lone checkbox that can only match everything.
             * Shown from two upwards, so it returns by itself if the CMS adds one.
             */}
            {showCountries && (
              <Group
                title={t("Countries")}
                showHeader={showCountries}
                defaultOpen={false}
              >
                {countries.map((country) => (
                  <Check
                    key={country.id}
                    label={country.name}
                    checked={selectedCountries.includes(
                      country.code.toLowerCase(),
                    )}
                    onChange={() => onToggleCountry(country.code.toLowerCase())}
                  />
                ))}
              </Group>
            )}
          </div>

          {hasFilters && (
            <div className={styles["menu-footer"]}>
              <button
                type="button"
                className={styles.clear}
                onClick={onClearAll}
              >
                {t("ClearAllFilters")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { FilterPopover };
