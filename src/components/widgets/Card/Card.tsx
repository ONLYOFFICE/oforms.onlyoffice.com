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
import { Link } from "@src/components/ui/Link";
import { Heading } from "@src/components/ui/Heading";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { TFormat } from "@src/types/data";
import { ICard } from "./Card.types";
import styles from "./Card.module.scss";

const hoverIconByFormat: Record<TFormat, string> = {
  docx: getAssetUrl("/images/widgets/card/docx-hover.png"),
  xlsx: getAssetUrl("/images/widgets/card/xlsx-hover.png"),
  pptx: getAssetUrl("/images/widgets/card/pptx-hover.png"),
  pdf: getAssetUrl("/images/widgets/card/pdf-hover.png"),
};

const hoverBgByFormat: Record<TFormat, string> = {
  docx: "#EAF1FE",
  xlsx: "rgba(196, 249, 232, 0.5)",
  pptx: "rgba(255, 111, 61, 0.05)",
  pdf: "rgba(249, 221, 229, 0.5)",
};

const Card = ({
  className,
  preview,
  format,
  heading,
  description,
  url,
}: ICard) => {
  return (
    <Link
      href={url ? (url.startsWith("/") ? url : `/${url}`) : "#"}
      className={clsx(styles.card, className)}
      textUnderline={false}
      style={
        {
          "--card-hover-bg": hoverBgByFormat[format],
          [`--card-hover-icon-${format}`]: `url(${hoverIconByFormat[format]})`,
        } as React.CSSProperties
      }
    >
      <div className={styles["card-preview-wrapper"]}>
        <div
          className={styles["card-preview"]}
          style={
            {
              "--card-preview-image": preview ? `url(${preview})` : "none",
            } as React.CSSProperties
          }
        />
        <span
          className={clsx(
            styles["card-format"],
            styles[`card-format-${format}`],
          )}
        >
          <span>{format}</span>
        </span>
      </div>
      <div>
        <Heading className={styles["card-heading"]} level={3} color="#494B5B">
          {heading}
        </Heading>
        <p className={styles["card-description"]}>{description}</p>
      </div>
    </Link>
  );
};

export { Card };
