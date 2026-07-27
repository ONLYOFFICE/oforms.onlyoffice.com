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

import { forwardRef, useState } from "react";
import clsx from "clsx";
import { ITextArea } from "./TextArea.types";
import styles from "./TextArea.module.scss";

const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
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
      showCounter,
      cols,
      rows = 3,
      required,
      requiredMark,
      disabled,
      status = "default",
      error,
      onChange,
      onFocus,
      onBlur,
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const hideLabel = focused || Boolean(value);
    const isError = status === "error";

    return (
      <div>
        <label>
          <div className={styles["textarea-heading"]}>
            {heading}{" "}
            {requiredMark && (
              <span className={styles["textarea-heading-required-mark"]}>
                *
              </span>
            )}
          </div>
          <div className={styles["textarea-wrapper"]}>
            {label && !hideLabel && (
              <div className={styles["textarea-label"]}>{label}</div>
            )}
            <textarea
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
              id={id}
              className={clsx(
                styles["textarea-field"],
                label && styles["textarea-field-with-label"],
                isError && styles["textarea-field-error"],
                className,
              )}
              placeholder={placeholder}
              value={value}
              name={name}
              autoComplete={autoComplete}
              maxLength={maxLength}
              cols={cols}
              rows={rows}
              required={required}
              disabled={disabled}
            />
            {showCounter && maxLength !== undefined && !isError && (
              <div className={styles["textarea-counter"]}>
                {String(value).length}/{maxLength}
              </div>
            )}
          </div>
        </label>
        {isError && error && (
          <div className={styles["textarea-error"]}>{error}</div>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export { TextArea };
