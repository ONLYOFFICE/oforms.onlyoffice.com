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

import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Heading } from "@src/components/ui/Heading";
import { Sidebar } from "./sub-components/Sidebar";
import { Section } from "@src/components/ui/Section";
import { Container } from "@src/components/ui/Container";
import { SortSelector } from "@src/components/modules/Main/sub-components/SortSelector";
import { SearchInput } from "@src/components/modules/Main/sub-components/SearchInput";
import { getAssetUrl } from "@src/utils/getAssetUrl";
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
  selectedType,
  formNames,
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
      background="#f9fbfe"
      desktopSpacing={["84px", "112px"]}
      tabletSpacing={["64px", "112px"]}
      tabletSmallSpacing={["64px", "112px"]}
      mobileSpacing={["64px", "112px"]}
    >
      <Container className={styles["main-container"]}>
        <div className={styles["main-header"]}>
          <Heading className={styles["main-header-heading"]} color="#231990">
            {t("FreeDocumentTemplatesAndFillableForms")}
          </Heading>
          <Heading
            className={styles["main-header-subheading"]}
            level={2}
            size={3}
            color="#494b5b"
          >
            {t("DownloadReadyMadeTemplatesOrFillOutPdfFormsOnline")}
          </Heading>
        </div>

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
            <div className={styles["main-top"]}>
              <div className={styles["main-top-wrapper"]}>
                <div className={styles["main-top-content"]}>
                  <SortSelector />
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
                  style={
                    {
                      "--main-filters-button-icon": `url(${getAssetUrl("/images/templates/main/filters.svg")})`,
                    } as React.CSSProperties
                  }
                ></button>
              </div>

              <SearchInput formNames={formNames} />
            </div>

            {children}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export { Main };
