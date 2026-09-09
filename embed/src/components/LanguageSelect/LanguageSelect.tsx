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
import { LANGUAGES, type Locale } from "../../locale";
import styles from "./LanguageSelect.module.scss";

interface ILanguageSelectProps {
  value: Locale;
  onChange: (value: Locale) => void;
}

const LanguageSelect = ({ value, onChange }: ILanguageSelectProps) => {
  const { t } = useTranslation("embed");
  const { isOpen, setIsOpen, ref } = useDropdown();

  const current = LANGUAGES.find((item) => item.shortKey === value);

  return (
    <div className={styles.language} ref={ref}>
      <button
        type="button"
        className={styles["language-button"]}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("Language")}
      >
        {current?.longKey ?? value}
        <span className={styles["language-chevron"]} aria-hidden="true" />
      </button>

      {isOpen && (
        <ul className={styles["language-menu"]} role="listbox">
          {LANGUAGES.map((item) => (
            <li key={item.shortKey}>
              <button
                type="button"
                role="option"
                aria-selected={item.shortKey === value}
                lang={item.shortKey}
                className={clsx(
                  styles["language-option"],
                  item.shortKey === value && styles["language-option-active"],
                )}
                onClick={() => {
                  onChange(item.shortKey);
                  setIsOpen(false);
                }}
              >
                {item.longKey}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { LanguageSelect };
