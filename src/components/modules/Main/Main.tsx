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
import { Section } from "@src/components/ui/Section";
import { Container } from "@src/components/ui/Container";
import { SortSelector } from "@src/components/modules/Main/sub-components/SortSelector";
import { SearchInput } from "@src/components/modules/Main/sub-components/SearchInput";
import { FiltersIcon } from "@src/components/icons";
import { IMain } from "./Main.types";
import styles from "./Main.module.scss";

const Main = ({
  children,
  isEmbed,
  docxForms,
  xlsxForms,
  pptxForms,
  pdfForms,
  countries,
  purposes,
  categoriesByPurpose,
  totalCount,
  selectedType,
  formNames,
  searchOnly,
}: IMain) => {
  const { t } = useTranslation("MainTemplate");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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
      <Container
        className={styles["main-container"]}
        maxWidth={isEmbed ? "none" : undefined}
      >
        {!isEmbed && (
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
        )}

        <div className={styles["main-wrapper"]}>
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
            selectedType={selectedType}
          />

          <div>
            <div
              className={clsx(
                styles["main-top"],
                searchOnly && styles["main-top-search-only"],
              )}
            >
              {!searchOnly && (
                <div className={styles["main-top-wrapper"]}>
                  <div
                    className={clsx(
                      styles["main-top-content"],
                      isEmbed && styles["main-top-content-embed"],
                    )}
                  >
                    <SortSelector
                      className={clsx(
                        styles["main-sort-selector"],
                        isEmbed && styles["main-sort-selector-embed"],
                      )}
                    />
                    <div
                      className={clsx(
                        styles["main-count"],
                        isEmbed && styles["main-count-embed"],
                      )}
                    >
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
                    className={clsx(
                      styles["main-filters-button"],
                      isEmbed && styles["main-filter-button-embed"],
                    )}
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
                formNames={formNames}
              />
            </div>

            {children}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export { Main };
