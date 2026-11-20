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

import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { Heading } from "@src/components/ui/Heading";
import { Sidebar } from "./sub-components/Sidebar";
import { MainSection } from "./sub-components/MainSection";
import { createPlaceholderCards } from "./sub-components/MainSection/MainSection.utils";
import { Section } from "@src/components/ui/Section";
import { Container } from "@src/components/ui/Container";
import { SortSelector } from "@src/components/modules/Main/sub-components/SortSelector";
import { SearchInput } from "@src/components/modules/Main/sub-components/SearchInput";
import { FiltersIcon } from "@src/components/icons";
import { IMain } from "./Main.types";
import styles from "./Main.module.scss";

const Main = ({
  children,
  docxForms,
  xlsxForms,
  pptxForms,
  pdfForms,
  countries,
  purposes,
  categoriesByPurpose,
  totalCount,
  formNames,
  skeleton = <MainSection label={" "} data={createPlaceholderCards(8)} />,
  isInitialLoading,
  selectedCategory,
  searchOnly,
  redirectToHome,
}: IMain) => {
  const { t } = useTranslation("MainTemplate");
  const [isOpen, setIsOpen] = useState(false);
  const hideTopWhileLoading = skeleton === null;

  const categorySubcategories = selectedCategory
    ? Array.from(
        new Set(
          Object.values(categoriesByPurpose)
            .flat()
            .filter(({ category }) => category.urlReq === selectedCategory)
            .flatMap(({ subcategories }) =>
              subcategories.map((sub) => sub.urlReq),
            ),
        ),
      )
    : [];

  useEffect(() => {
    if (!isOpen) return;

    const mediaQuery = window.matchMedia(`(max-width: 1024px)`);

    const handleChange = () => {
      if (!mediaQuery.matches) setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      document.body.style.overflow = "";
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [isOpen]);

  return (
    <Section
      className={styles["main-content"]}
      desktopSpacing={["84px", "112px"]}
      tabletSpacing={["64px", "112px"]}
      tabletSmallSpacing={["48px", "112px"]}
      mobileSpacing={["48px", "112px"]}
    >
      <Container className={styles["main-container"]}>
        <div className={styles["main-header"]}>
          <Heading
            className={styles["main-header-heading"]}
            color="var(--main-heading-color)"
          >
            {t("FreeDocumentTemplatesAndFillableForms")}
          </Heading>
          <Heading
            className={styles["main-header-subheading"]}
            level={2}
            size={3}
            color="var(--main-subheading-color)"
          >
            {t("DownloadReadyMadeTemplatesOrFillOutPdfFormsOnline")}
          </Heading>
        </div>

        <div
          className={clsx(
            styles["main-wrapper"],
            "skeleton",
            isInitialLoading && "skeleton-active",
          )}
          inert={isInitialLoading}
        >
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            countries={countries}
            purposes={purposes}
            categoriesByPurpose={categoriesByPurpose}
            docxForms={docxForms}
            xlsxForms={xlsxForms}
            pptxForms={pptxForms}
            pdfForms={pdfForms}
            selectedCategory={selectedCategory}
            categorySubcategories={categorySubcategories}
            redirectToHome={redirectToHome}
          />

          <div>
            <div
              className={clsx(
                styles["main-top"],
                searchOnly && styles["main-top-search-only"],
                hideTopWhileLoading && styles["main-top-pending"],
                hideTopWhileLoading &&
                  isInitialLoading &&
                  styles["main-top-pending-hidden"],
              )}
            >
              {!searchOnly && (
                <div className={styles["main-top-wrapper"]}>
                  <div className={styles["main-top-content"]}>
                    <SortSelector className={styles["main-sort-selector"]} />
                    <div className={styles["main-count"]}>
                      <span className={styles["main-count-label"]}>
                        {t("Documents")}
                      </span>
                      <span className={styles["main-count-value"]}>
                        {totalCount}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsOpen(true)}
                    className={styles["main-filters-button"]}
                    type="button"
                  >
                    <FiltersIcon fill="var(--main-filters-button-icon-color)" />
                  </button>
                </div>
              )}

              <SearchInput
                className={clsx(
                  styles["main-search-input"],
                  searchOnly && styles["main-search-input-search-only"],
                )}
                countryCodes={countries.map((country) =>
                  country.code.toLowerCase(),
                )}
                formNames={formNames}
              />
            </div>

            <div
              className={clsx(
                styles["main-pending-skeleton"],
                isInitialLoading && styles["main-pending-skeleton-active"],
              )}
            >
              {skeleton}
            </div>
            <div
              className={clsx(
                styles["main-pending-content"],
                isInitialLoading && styles["main-pending-content-hidden"],
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export { Main };
