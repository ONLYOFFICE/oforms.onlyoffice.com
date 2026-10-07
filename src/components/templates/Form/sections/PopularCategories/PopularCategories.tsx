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
import { Section } from "@src/components/ui/Section";
import { Container } from "@src/components/ui/Container";
import { Heading } from "@src/components/ui/Heading";
import { Button } from "@src/components/ui/Button";
import { IPopularCategories } from "./PopularCategories.types";
import styles from "./PopularCategories.module.scss";

const PopularCategories = ({ categories }: IPopularCategories) => {
  const { t } = useTranslation("form");

  return (
    <Section
      desktopSpacing={["32px", "32px"]}
      tabletSpacing={["32px", "32px"]}
      tabletSmallSpacing={["32px", "32px"]}
      mobileSpacing={["10px", "20px"]}
    >
      <Container maxWidth="1452px">
        <Heading
          className={styles["popular-categories-heading"]}
          level={2}
          size={3}
        >
          {t("PopularCategories")}
        </Heading>

        <div className={styles["popular-categories-list"]}>
          {categories.data.map((category) => (
            <Button
              className={styles["popular-categories-btn"]}
              as="a"
              variant="tertiary-dark"
              size={3}
              href={`/${category.urlReq}`}
              key={category.id}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export { PopularCategories };
