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
import { TYPE_LABEL_KEYS, TYPE_ORDER } from "../../types";
import styles from "./TypeFilter.module.scss";

interface ITypeFilterProps {
  selected: string;
  onSelect: (ext: string) => void;
}

/**
 * One file type at a time. No template exists in two formats, so this is a
 * partition of the catalog rather than a choice — tabs, single-select, no All.
 */
const TypeFilter = ({ selected, onSelect }: ITypeFilterProps) => {
  const { t } = useTranslation("MainTemplate");

  return (
    <div className={styles.tabs} role="tablist">
      {TYPE_ORDER.map((ext) => {
        const isSelected = ext === selected;

        return (
          <button
            key={ext}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={clsx(
              styles.tab,
              styles[`tab-${ext}`],
              isSelected && styles["tab-selected"],
            )}
            onClick={() => onSelect(ext)}
          >
            {t(TYPE_LABEL_KEYS[ext])}
          </button>
        );
      })}
    </div>
  );
};

export { TypeFilter };
