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

import { useTranslation } from "next-i18next";
import { Tooltip } from "react-tooltip";
import { Link } from "@src/components/ui/Link";
import { TooltipIcon } from "@src/components/icons";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { IDownloadAsItem } from "./DownloadAsItem.types";
import styles from "./DownloadAsItem.module.scss";

const FORMAT_LABEL: Record<IDownloadAsItem["format"], string> = {
  docx: "DOCX",
  xlsx: "XLSX",
  pptx: "PPTX",
  pdf: "PDF",
};

const FORMAT_TOOLTIP_KEY: Partial<Record<IDownloadAsItem["format"], string>> = {
  docx: "DownloadADocxDocument",
  xlsx: "DownloadAXlsxDocument",
  pptx: "DownloadAPptxDocument",
};

const DownloadAsItem = ({ format, href }: IDownloadAsItem) => {
  const { t } = useTranslation("form");

  const tooltipKey = FORMAT_TOOLTIP_KEY[format];

  return (
    <div className={styles["download-as-item"]}>
      <Link
        className={styles["download-as-link"]}
        href={href}
        download
        style={
          {
            "--download-as-item-icon": `url(${getAssetUrl(
              `/images/templates/form/hero/${format}.svg`,
            )})`,
          } as React.CSSProperties
        }
      >
        {FORMAT_LABEL[format]}
      </Link>

      {tooltipKey ? (
        <>
          <button
            id={`form-${format}-tooltip`}
            className={styles["download-as-item-tooltip"]}
            data-tooltip-id={`${format}-tooltip`}
            type="button"
          >
            <TooltipIcon fill="var(--form-hero-download-as-item-tooltip-icon-color)" />
          </button>
          <Tooltip
            id={`${format}-tooltip`}
            className={`${styles["download-as-item-tooltip-text"]} ${styles["react-tooltip"]}`}
            classNameArrow={styles["react-tooltip-arrow"]}
            place="bottom-start"
          >
            {t(tooltipKey)}
          </Tooltip>
        </>
      ) : null}
    </div>
  );
};

export { DownloadAsItem };
