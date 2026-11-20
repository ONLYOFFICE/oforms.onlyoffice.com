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
import clsx from "clsx";
import { Link } from "@src/components/ui/Link";
import { ChevronDownIcon } from "@src/components/icons";
import { IBreadcrumbsDropdown } from "./BreadcrumbsDropdown.types";
import styles from "./BreadcrumbsDropdown.module.scss";

const BreadcrumbsDropdown = ({
  label,
  activeHref,
  options,
}: IBreadcrumbsDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={ref} className={styles["breadcrumbs-dropdown"]}>
      <button
        type="button"
        className={clsx(
          styles["breadcrumbs-dropdown-button"],
          isOpen && styles["breadcrumbs-dropdown-button-open"],
        )}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <ChevronDownIcon
          className={styles["breadcrumbs-dropdown-button-icon"]}
          fill="currentColor"
        />
      </button>

      {isOpen && (
        <ul className={styles["breadcrumbs-dropdown-list"]}>
          {options.map((option) => (
            <li key={option.href}>
              <Link
                className={clsx(
                  styles["breadcrumbs-dropdown-option"],
                  option.href === activeHref &&
                    styles["breadcrumbs-dropdown-option-active"],
                )}
                href={option.href}
                locale={option.locale}
                onClick={() => setIsOpen(false)}
              >
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { BreadcrumbsDropdown };
