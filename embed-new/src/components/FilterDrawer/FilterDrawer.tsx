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

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { ChevronIcon, CrossIcon } from "../icons";
import {
  TYPE_ORDER,
  type ICategoryCount,
  type ICountry,
  type IPurpose,
} from "../../types";
import type { TAllowedTypes } from "../../types";
import styles from "./FilterDrawer.module.scss";

const TYPE_LABEL_KEYS: Record<TAllowedTypes, string> = {
  docx: "Documents",
  xlsx: "Spreadsheets",
  pptx: "Presentations",
  pdf: "PdfForms",
};

interface IFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  typeCounts: Record<TAllowedTypes, number>;
  countries: (ICountry & { count: number })[];
  categories: ICategoryCount[];
  purposes: (IPurpose & { count: number })[];
  selectedTypes: string[];
  selectedCountries: string[];
  selectedCategories: string[];
  selectedPurposes: string[];
  onToggleType: (value: string) => void;
  onToggleCountry: (value: string) => void;
  onToggleCategory: (value: string) => void;
  onTogglePurpose: (value: string) => void;
  onClearAll: () => void;
}

interface ICheckProps {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}

const Check = ({ label, count, checked, onChange }: ICheckProps) => (
  <label className={clsx(styles.check, checked && styles["check-checked"])}>
    <input
      type="checkbox"
      className={styles["check-input"]}
      checked={checked}
      onChange={onChange}
    />
    <span className={styles["check-label"]}>{label}</span>
    {count !== undefined && (
      <span className={styles["check-count"]}>{count}</span>
    )}
  </label>
);

const Group = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

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

const FilterDrawer = ({
  isOpen,
  onClose,
  typeCounts,
  countries,
  categories,
  purposes,
  selectedTypes,
  selectedCountries,
  selectedCategories,
  selectedPurposes,
  onToggleType,
  onToggleCountry,
  onToggleCategory,
  onTogglePurpose,
  onClearAll,
}: IFilterDrawerProps) => {
  const { t } = useTranslation("MainTemplate");
  const { t: tEmbed } = useTranslation("embed");

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasFilters =
    selectedTypes.length > 0 ||
    selectedCountries.length > 0 ||
    selectedCategories.length > 0 ||
    selectedPurposes.length > 0;

  return (
    <div className={styles.overlay}>
      <div
        className={styles.backdrop}
        onClick={onClose}
        role="presentation"
      />

      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label={tEmbed("Filters")}
      >
        <header className={styles["drawer-header"]}>
          <span className={styles["drawer-title"]}>{tEmbed("Filters")}</span>
          <button
            type="button"
            className={styles["drawer-close"]}
            onClick={onClose}
            aria-label={tEmbed("Close")}
          >
            <CrossIcon />
          </button>
        </header>

        <div className={styles["drawer-body"]}>
          <Group title={t("Type")}>
            {TYPE_ORDER.map((ext) => (
              <Check
                key={ext}
                label={t(TYPE_LABEL_KEYS[ext])}
                count={typeCounts[ext]}
                checked={selectedTypes.includes(ext)}
                onChange={() => onToggleType(ext)}
              />
            ))}
          </Group>

          {purposes.length > 0 && (
            <Group title={t("Purpose")}>
              {purposes.map((purpose) => (
                <Check
                  key={purpose.id}
                  label={purpose.name}
                  count={purpose.count}
                  checked={selectedPurposes.includes(purpose.key)}
                  onChange={() => onTogglePurpose(purpose.key)}
                />
              ))}
            </Group>
          )}

          {categories.length > 0 && (
            <Group title={t("Сategories")}>
              {categories.map((category) => (
                <Check
                  key={category.id}
                  label={category.name}
                  count={category.count}
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
          {countries.length > 1 && (
            <Group title={t("Countries")} defaultOpen={false}>
              {countries.map((country) => (
                <Check
                  key={country.id}
                  label={country.name}
                  count={country.count}
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
          <footer className={styles["drawer-footer"]}>
            <button
              type="button"
              className={styles["drawer-clear"]}
              onClick={onClearAll}
            >
              {t("ClearAllFilters")}
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
};

export { FilterDrawer };
