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
import { useDropdown } from "../../hooks/useDropdown";
import type { TSortKey } from "../../lib/filters";
import styles from "./SortSelect.module.scss";

const OPTIONS: { key: TSortKey; labelKey: string }[] = [
  { key: "popular", labelKey: "MostPopular" },
  { key: "asc", labelKey: "NewestOldest" },
  { key: "desc", labelKey: "OldestNewest" },
  { key: "name_asc", labelKey: "A-Z" },
  { key: "name_desc", labelKey: "Z-A" },
];

interface ISortSelectProps {
  value: TSortKey;
  onChange: (value: TSortKey) => void;
}

const SortSelect = ({ value, onChange }: ISortSelectProps) => {
  const { t } = useTranslation("SortSelector");
  const { isOpen, setIsOpen, ref } = useDropdown();

  const current = OPTIONS.find((option) => option.key === value) ?? OPTIONS[1];

  return (
    <div className={styles.sort} ref={ref}>
      <span className={styles["sort-label"]}>{t("SortBy")}</span>

      <button
        type="button"
        className={styles["sort-button"]}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {t(current.labelKey)}
        <span className={styles["sort-chevron"]} aria-hidden="true" />
      </button>

      {isOpen && (
        <ul className={styles["sort-dropdown"]} role="listbox">
          {OPTIONS.map((option) => (
            <li key={option.key}>
              <button
                type="button"
                role="option"
                aria-selected={option.key === value}
                className={clsx(
                  styles["sort-option"],
                  option.key === value && styles["sort-option-active"],
                )}
                onClick={() => {
                  onChange(option.key);
                  setIsOpen(false);
                }}
              >
                {t(option.labelKey)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { SortSelect };
