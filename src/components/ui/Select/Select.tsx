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

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { ISelect, ISelectOption } from "./Select.types";
import styles from "./Select.module.scss";

const Select = (props: ISelect) => {
  const {
    id,
    className,
    heading,
    label,
    placeholder,
    name,
    options,
    resetLabel,
    disabled,
    status = "default",
    error,
    onBlur,
    onFocus,
    searchable = false,
    counter,
  } = props;
  const { t } = useTranslation("Select");
  const multiple = props.multiple === true;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isError = status === "error";

  const selectedValues = multiple
    ? (props.value ?? [])
    : props.value
      ? [props.value]
      : [];
  const isSelected = (optionValue: string) =>
    selectedValues.includes(optionValue);

  const selectedOptions = options.filter((option) => isSelected(option.value));
  const hasSelection = selectedOptions.length > 0;

  const filteredOptions =
    searchable && search.trim()
      ? options.filter((option) =>
          option.label.toLowerCase().includes(search.trim().toLowerCase()),
        )
      : options;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (option: ISelectOption) => {
    if (props.multiple) {
      const next = isSelected(option.value)
        ? selectedValues.filter((item) => item !== option.value)
        : [...selectedValues, option.value];
      props.onChange?.(next);
      setOpen(false);
      return;
    }

    props.onChange?.(option.value);
    setOpen(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpen(false);
      onBlur?.();
    }
  };

  const handleReset = () => {
    if (props.multiple) {
      props.onChange?.([]);
    } else {
      props.onChange?.("");
    }
    setOpen(false);
  };

  return (
    <div ref={rootRef} onBlur={handleBlur} onFocus={() => onFocus?.()}>
      {heading && <div className={styles["select-heading"]}>{heading}</div>}
      <div className={styles["select-wrapper"]}>
        <button
          id={id}
          type="button"
          name={name}
          disabled={disabled}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() =>
            setOpen((prev) => {
              if (!prev && searchable) {
                setSearch("");
                inputRef.current?.focus();
              }
              return !prev;
            })
          }
          className={clsx(
            styles["select-field"],
            open && styles["select-field-open"],
            isError && styles["select-field-error"],
            className,
          )}
        >
          <span
            className={clsx(
              styles["select-value"],
              !hasSelection &&
                !open &&
                Boolean(label) &&
                styles["select-label"],
              !hasSelection &&
                !(!open && Boolean(label)) &&
                styles["select-placeholder"],
            )}
          >
            {multiple && open && !hasSelection
              ? ""
              : hasSelection
                ? selectedOptions.map((option) => option.label).join(", ")
                : open
                  ? placeholder
                  : (label ?? placeholder)}
          </span>
          {searchable && (
            <input
              className={clsx(
                styles["select-input"],
                open && styles["select-input-open"],
              )}
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          <span className={styles["select-input-wrapper"]}>
            {counter && hasSelection && (
              <span className={styles["select-count"]}>
                ({selectedOptions.length})
              </span>
            )}
            <span
              className={styles["select-arrow"]}
              style={
                {
                  "--select-chevron-icon": `url(${getAssetUrl("/images/ui/select/chevron-down.svg")})`,
                } as React.CSSProperties
              }
            />
          </span>
        </button>
        {open && (
          <ul className={styles["select-dropdown"]}>
            {filteredOptions.length > 0 ? (
              <>
                <li>
                  <button
                    onClick={handleReset}
                    className={clsx(
                      styles["select-option"],
                      styles["select-option-reset"],
                    )}
                    type="button"
                    style={
                      {
                        "--select-cross-icon": `url(${getAssetUrl("/images/ui/select/cross.svg")})`,
                      } as React.CSSProperties
                    }
                  >
                    {resetLabel}
                  </button>
                </li>
                {filteredOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      onClick={() => handleSelect(option)}
                      className={clsx(
                        styles["select-option"],
                        isSelected(option.value) &&
                          styles["select-option-selected"],
                      )}
                      type="button"
                      aria-current={isSelected(option.value)}
                      style={
                        {
                          "--select-check-icon": `url(${getAssetUrl("/images/ui/select/check.svg")})`,
                        } as React.CSSProperties
                      }
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </>
            ) : (
              <li className={styles["select-option-empty"]}>
                {t("NoOptions")}
              </li>
            )}
          </ul>
        )}
      </div>
      {isError && error && (
        <div className={styles["select-error"]}>{error}</div>
      )}
    </div>
  );
};

export { Select };
