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
import { IMainTemplate } from "./Main.types";
import { IMainView } from "@src/lib/server/mainView.types";
import { useServerView } from "@src/lib/hooks/useServerView";
import { useFormNames } from "@src/lib/hooks/useFormNames";
import { useSaveBackQuery } from "@src/lib/hooks/useBackQuery";
import { Main } from "@src/components/modules/Main";
import { MainSection } from "@src/components/modules/Main/sub-components/MainSection";
import { NoResultsFound } from "@src/components/modules/NoResultsFound";
import { Button } from "@src/components/ui/Button";
import styles from "./Main.module.scss";

const MainTemplate = ({ initialView, initialFormNames }: IMainTemplate) => {
  const { t } = useTranslation("MainTemplate");
  const { view, isInitialLoading } = useServerView<IMainView>(initialView);
  const { formNames } = useFormNames(initialFormNames);
  useSaveBackQuery();

  return (
    <Main
      docxForms={view.docxForms}
      xlsxForms={view.xlsxForms}
      pptxForms={view.pptxForms}
      pdfForms={view.pdfForms}
      countries={view.countries}
      purposes={view.purposes}
      categoriesByPurpose={view.categoriesByPurpose}
      totalCount={view.totalCount}
      formNames={formNames}
      isInitialLoading={isInitialLoading}
      searchOnly={view.isEmpty}
    >
      {view.isEmpty && (
        <>
          <NoResultsFound />
          <Button
            className={styles["main-browse-all-btn"]}
            as="a"
            href="/"
            variant="secondary-dark"
          >
            {t("BrowseAllTemplates")}
          </Button>
        </>
      )}

      {view.popularTemplates.length > 0 && (
        <MainSection
          label={t("PopularTemplates")}
          data={view.popularTemplates}
        />
      )}

      {view.sections.map((section) => (
        <MainSection
          key={section.key}
          label={section.labelKey ? t(section.labelKey) : section.label}
          href={section.href}
          data={section.data}
        />
      ))}
    </Main>
  );
};

export { MainTemplate };
