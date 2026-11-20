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

import { forwardRef, useState } from "react";
import clsx from "clsx";
import { IInput } from "./Input.types";
import styles from "./Input.module.scss";

const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      id,
      className,
      heading,
      label,
      placeholder,
      value,
      name,
      autoComplete,
      maxLength,
      pattern,
      type,
      required,
      requiredMark,
      disabled,
      status = "default",
      error,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const hideLabel = focused || Boolean(value);
    const isError = status === "error";

    return (
      <div>
        <label>
          {heading && (
            <div className={styles["input-heading"]}>
              {heading}{" "}
              {requiredMark && (
                <span className={styles["input-heading-required-mark"]}>*</span>
              )}
            </div>
          )}
          <div className={styles["input-wrapper"]}>
            {label && !hideLabel && (
              <div className={styles["input-label"]}>{label}</div>
            )}
            <input
              ref={ref}
              onChange={onChange}
              onFocus={(event) => {
                setFocused(true);
                onFocus?.(event);
              }}
              onBlur={(event) => {
                setFocused(false);
                onBlur?.(event);
              }}
              onKeyDown={onKeyDown}
              id={id}
              className={clsx(
                styles["input-field"],
                label && styles["input-field-with-label"],
                isError && styles["input-field-error"],
                className,
              )}
              placeholder={placeholder}
              value={value}
              name={name}
              autoComplete={autoComplete}
              maxLength={maxLength}
              pattern={pattern}
              type={type}
              required={required}
              disabled={disabled}
            />
          </div>
        </label>
        {isError && error && (
          <div className={styles["input-error"]}>{error}</div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
