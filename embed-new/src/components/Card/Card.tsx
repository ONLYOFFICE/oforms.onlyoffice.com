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

import clsx from "clsx";
import docxHover from "@public/images/widgets/card/docx-hover.png";
import xlsxHover from "@public/images/widgets/card/xlsx-hover.png";
import pptxHover from "@public/images/widgets/card/pptx-hover.png";
import pdfHover from "@public/images/widgets/card/pdf-hover.png";
import type { ITemplate, TAllowedTypes } from "../../types";
import { previewUrl } from "../../data";
import styles from "./Card.module.scss";

const hoverIconByFormat: Record<TAllowedTypes, string> = {
  docx: docxHover,
  xlsx: xlsxHover,
  pptx: pptxHover,
  pdf: pdfHover,
};

interface ICardProps {
  template: ITemplate;
  onSelect: (template: ITemplate) => void;
}

/**
 * A button rather than a link: the embed opens a modal instead of navigating,
 * and there is no template page to point at from inside the iframe.
 */
const Card = ({ template, onSelect }: ICardProps) => {
  const format = template.form_exts?.[0]?.ext ?? "docx";
  const preview = previewUrl(template);

  return (
    <button
      type="button"
      className={clsx(styles.card, styles[`card-${format}`])}
      onClick={() => onSelect(template)}
      style={
        {
          "--card-hover-icon": `url(${hoverIconByFormat[format]})`,
        } as React.CSSProperties
      }
    >
      <span className={styles["card-preview-wrapper"]}>
        <span
          className={styles["card-preview"]}
          style={
            {
              "--card-preview-image": preview ? `url(${preview})` : "none",
            } as React.CSSProperties
          }
        />
        <span className={styles["card-preview-footer"]}>
          <span
            className={clsx(
              styles["card-format"],
              styles[`card-format-${format}`],
            )}
          >
            <span>{format}</span>
          </span>
        </span>
      </span>

      <span className={styles["card-heading"]}>{template.name_form}</span>
    </button>
  );
};

export { Card };
