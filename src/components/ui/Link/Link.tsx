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
