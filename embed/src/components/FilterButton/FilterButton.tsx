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

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import clsx from "clsx";
import { useDropdown } from "../../hooks/useDropdown";
import { CheckIcon, ChevronIcon, CrossIcon } from "../icons";
import styles from "./FilterButton.module.scss";

export interface IFilterOption {
  value: string;
  label: string;
}

interface IFilterButtonProps {
  label: string;
  clearLabel: string;
  options: IFilterOption[];
  /** `""` is nothing selected, which means all. */
  value: string;
  onChange: (value: string) => void;
}

const FilterButton = ({
  label,
  clearLabel,
  options,
  value,
  onChange,
}: IFilterButtonProps) => {
  const { isOpen, setIsOpen, ref } = useDropdown();
  const [active, setActive] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = options[selectedIndex];

  const open = () => {
    setActive(Math.max(0, selectedIndex));
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const pick = (next: string) => {
    if (next !== value) onChange(next);
    close();
  };

  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document
        .getElementById(`${id}-${active}`)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [isOpen, active, id]);

  const onTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      open();
    }
  };

  const onListKeyDown = (event: KeyboardEvent) => {
    const last = options.length - 1;
    const move: Record<string, number> = {
      ArrowDown: Math.min(active + 1, last),
      ArrowUp: Math.max(active - 1, 0),
      Home: 0,
      End: last,
    };

    if (event.key in move) {
      event.preventDefault();
      setActive(move[event.key]);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (options[active]) pick(options[active].value);
    } else if (event.key === "Escape") {
      close();
    } else if (event.key === "Tab") {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.filter} ref={ref}>
      <div
        className={clsx(
          styles.control,
          selected && styles["control-active"],
          options.length === 0 && styles["control-disabled"],
        )}
      >
        <button
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          onClick={() => (isOpen ? setIsOpen(false) : open())}
          onKeyDown={onTriggerKeyDown}
          disabled={options.length === 0}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? `${id}-list` : undefined}
        >
          <span className={styles.label}>{selected?.label ?? label}</span>
          <ChevronIcon open={isOpen} />
        </button>

        {selected && (
          <button
            type="button"
            className={styles.clear}
            onClick={() => {
              onChange("");
              close();
            }}
            aria-label={clearLabel}
          >
            <CrossIcon />
          </button>
        )}
      </div>

      {isOpen && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          className={styles.menu}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${id}-${active}`}
          onKeyDown={onListKeyDown}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-${index}`}
              role="option"
              aria-selected={option.value === value}
              className={clsx(
                styles.option,
                index === active && styles["option-active"],
                option.value === value && styles["option-selected"],
              )}
              onMouseEnter={() => setActive(index)}
              onClick={() => pick(option.value)}
            >
              <CheckIcon />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { FilterButton };
