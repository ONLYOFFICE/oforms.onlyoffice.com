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
import { Section } from "@src/components/ui/Section";
import { Container } from "@src/components/ui/Container";
import { IFormSkeleton } from "./FormSkeleton.types";
import styles from "./FormSkeleton.module.scss";

const CATEGORY_WIDTHS = [148, 96, 172, 132, 184, 104, 160, 120, 176, 140];

const Bar = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <span className={clsx(styles["form-skeleton-bar"], className)} style={style} />
);

const FormSkeleton = ({ className }: IFormSkeleton) => {
  return (
    <div className={clsx("skeleton-active", className)} aria-hidden="true">
      <Container maxWidth="1452px">
        <Bar className={styles["form-skeleton-breadcrumbs"]} />
      </Container>

      <Section
        desktopSpacing={["0", "0"]}
        tabletSpacing={["0", "0"]}
        tabletSmallSpacing={["0", "0"]}
        mobileSpacing={["0", "0"]}
      >
        <Container maxWidth="1452px">
          <div className={styles["form-skeleton-hero"]}>
            <div className={styles["form-skeleton-info"]}>
              <Bar className={styles["form-skeleton-heading"]} />
              <Bar
                className={clsx(
                  styles["form-skeleton-heading"],
                  styles["form-skeleton-short"],
                )}
              />
              <div className={styles["form-skeleton-row"]}>
                <Bar className={styles["form-skeleton-label"]} />
                <Bar className={styles["form-skeleton-label"]} />
              </div>
              <Bar className={styles["form-skeleton-text"]} />
              <Bar className={styles["form-skeleton-text"]} />
              <Bar className={styles["form-skeleton-text"]} />
              <Bar
                className={clsx(
                  styles["form-skeleton-text"],
                  styles["form-skeleton-short"],
                )}
              />
              <div className={styles["form-skeleton-row"]}>
                <Bar className={styles["form-skeleton-meta"]} />
                <Bar className={styles["form-skeleton-meta"]} />
              </div>
              <div className={styles["form-skeleton-row"]}>
                <Bar className={styles["form-skeleton-meta"]} />
                <Bar className={styles["form-skeleton-meta"]} />
              </div>
              <Bar className={styles["form-skeleton-meta"]} />
              <div className={styles["form-skeleton-row"]}>
                <Bar className={styles["form-skeleton-button"]} />
                <Bar className={styles["form-skeleton-button"]} />
              </div>
              <div className={styles["form-skeleton-row"]}>
                <Bar className={styles["form-skeleton-share"]} />
                <Bar className={styles["form-skeleton-share"]} />
                <Bar className={styles["form-skeleton-share"]} />
              </div>
            </div>
            <Bar className={styles["form-skeleton-preview"]} />
          </div>
        </Container>
      </Section>

      <Section
        desktopSpacing={["0", "0"]}
        tabletSpacing={["0", "0"]}
        tabletSmallSpacing={["0", "0"]}
        mobileSpacing={["0", "34px"]}
      >
        <Container maxWidth="1452px">
          <div className={styles["form-skeleton-how-to-create"]}>
            <Bar className={styles["form-skeleton-section-heading"]} />
            <div className={styles["form-skeleton-list"]}>
              <Bar className={styles["form-skeleton-text"]} />
              <Bar className={styles["form-skeleton-text"]} />
              <Bar
                className={clsx(
                  styles["form-skeleton-text"],
                  styles["form-skeleton-short"],
                )}
              />
            </div>
            <Bar className={styles["form-skeleton-button"]} />
          </div>
        </Container>
      </Section>

      <Section
        desktopSpacing={["32px", "32px"]}
        tabletSpacing={["32px", "32px"]}
        tabletSmallSpacing={["32px", "32px"]}
        mobileSpacing={["34px", "10px"]}
      >
        <Container maxWidth="1452px">
          <Bar className={styles["form-skeleton-section-heading"]} />
          <div className={styles["form-skeleton-tiles"]}>
            {Array.from({ length: 4 }, (_, index) => (
              <Bar key={index} className={styles["form-skeleton-tile"]} />
            ))}
          </div>
        </Container>
      </Section>

      <Section
        desktopSpacing={["32px", "32px"]}
        tabletSpacing={["32px", "32px"]}
        tabletSmallSpacing={["32px", "32px"]}
        mobileSpacing={["10px", "20px"]}
      >
        <Container maxWidth="1452px">
          <Bar className={styles["form-skeleton-section-heading"]} />
          <div className={styles["form-skeleton-categories"]}>
            {CATEGORY_WIDTHS.map((width, index) => (
              <Bar
                key={index}
                className={styles["form-skeleton-category"]}
                style={{ width }}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section
        background="var(--form-build-your-own-forms-section-background-color)"
        desktopSpacing={["112px", "112px"]}
        tabletSpacing={["88px", "88px"]}
        tabletSmallSpacing={["88px", "88px"]}
        mobileSpacing={["48px", "48px"]}
      >
        <Container maxWidth="1452px">
          <Bar className={styles["form-skeleton-build"]} />
        </Container>
      </Section>
    </div>
  );
};

export { FormSkeleton };
