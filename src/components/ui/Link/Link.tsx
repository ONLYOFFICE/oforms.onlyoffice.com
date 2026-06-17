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

import type React from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { ILink } from "./Link.types";
import styles from "./Link.module.scss";

const Link = ({
  id,
  className,
  children,
  href,
  rel,
  download,
  type,
  size,
  target,
  tabIndex,
  display,
  fontWeight,
  color,
  textTransform,
  textUnderline,
  hover,
  style,
  ...rest
}: ILink) => {
  const asProp = !href || download || target === "_blank";
  const locale =
    typeof href === "string" &&
    process.env.NEXT_PUBLIC_SITE_URL &&
    href.startsWith(process.env.NEXT_PUBLIC_SITE_URL)
      ? false
      : true;
  const Component: React.ElementType = asProp ? "a" : NextLink;

  return (
    <Component
      id={id}
      className={clsx(
        styles.link,
        display && styles[`display-${display}`],
        size && styles[`size-${size}`],
        fontWeight && styles[`font-weight-${fontWeight}`],
        textTransform && styles[`text-transform-${textTransform}`],
        textUnderline === true && styles["text-underline"],
        hover && styles[`hover-${hover}`],
        className,
      )}
      href={href ?? "#"}
      rel={!rel && target === "_blank" ? "noopener noreferrer" : rel}
      download={download}
      type={type}
      target={target}
      tabIndex={tabIndex}
      {...(!asProp && {
        prefetch: false,
        ...(!locale && { locale: false }),
      })}
      style={
        {
          "--link-color": color,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Component>
  );
};

export { Link };
