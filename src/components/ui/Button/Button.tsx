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

import { forwardRef } from "react";
import clsx from "clsx";
import Link from "next/link";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { IButton } from "./Button.types";
import styles from "./Button.module.scss";

const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    {
      id,
      className,
      children,
      disabled,
      tabIndex,
      type = "button",
      title,
      as = "button",
      href,
      target,
      download,
      rel,
      fullWidth,
      variant = "primary",
      size = 1,
      status,
      style,
      onClick,
    },
    ref,
  ) => {
    const Component: React.ElementType = download
      ? "a"
      : as === "a"
        ? Link
        : "button";

    const isLightIcon = variant === "primary" || variant === "secondary-dark";
    const iconTheme = isLightIcon ? "light" : "dark";

    return (
      <Component
        ref={ref}
        id={id}
        className={clsx(
          styles.button,
          styles[`variant-${variant}`],
          styles[`size-${size}`],
          fullWidth && styles["full-width"],
          status === "loading" && styles.loading,
          status === "error" && styles.error,
          className,
        )}
        type={as === "button" ? type : undefined}
        href={as === "a" || download ? (href ?? "") : undefined}
        target={as === "a" ? target : undefined}
        rel={
          as === "a"
            ? !rel && target === "_blank"
              ? "noopener noreferrer"
              : rel
            : undefined
        }
        prefetch={download ? undefined : as === "a" ? false : undefined}
        download={download}
        disabled={disabled}
        tabIndex={tabIndex}
        title={title}
        style={
          {
            ...(status === "loading" && {
              "--loader-button-icon": `url(${getAssetUrl(`/images/ui/button/loader-${iconTheme}.svg`)})`,
            }),
            ...(status === "error" && {
              "--error-button-icon": `url(${getAssetUrl(`/images/ui/button/cross-${iconTheme}.svg`)})`,
            }),
            ...style,
          } as React.CSSProperties
        }
        onClick={onClick}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = "Button";

export { Button };
