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
import clsx from "clsx";
import { Text } from "@src/components/ui/Text";
import { DownloadAsItem, IDownloadAsItem } from "./DownloadAsItem";
import { IDownloadAs } from "./DownloadAs.types";
import styles from "./DownloadAs.module.scss";

const SUPPORTED_FORMATS: IDownloadAsItem["format"][] = [
  "docx",
  "xlsx",
  "pptx",
  "pdf",
];

const isSupportedFormat = (
  ext: string | undefined,
): ext is IDownloadAsItem["format"] =>
  SUPPORTED_FORMATS.includes(ext as IDownloadAsItem["format"]);

const DownloadAs = ({ className, file_oform }: IDownloadAs) => {
  const { t } = useTranslation("form");

  const files = (file_oform ?? []).flatMap((it) => {
    const format = it?.name.split(".").pop();
    return isSupportedFormat(format)
      ? [{ id: it.id, format, href: it.url }]
      : [];
  });

  return (
    <div className={clsx(styles["download-as"], className)}>
      <Text
        as="span"
        size={4}
        fontWeight={600}
        color="var(--form-hero-download-as-heading-color)"
        className={styles["download-as-heading"]}
      >
        {t("DownloadAs")}
      </Text>

      {files.map((file) => (
        <DownloadAsItem key={file.id} format={file.format} href={file.href} />
      ))}
    </div>
  );
};

export { DownloadAs };
