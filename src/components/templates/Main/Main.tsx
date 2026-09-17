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

import { useTranslation } from "next-i18next";
import { IMainTemplate } from "./Main.types";
import { IMainView } from "@src/lib/server/mainView.types";
import { useServerView } from "@src/lib/hooks/useServerView";
import { Main } from "@src/components/modules/Main";
import { MainSection } from "@src/components/modules/Main/sub-components/MainSection";
import { NoResultsFound } from "@src/components/modules/NoResultsFound";
import { Button } from "@src/components/ui/Button";
import styles from "./Main.module.scss";

const MainTemplate = ({ initialView, initialFormNames }: IMainTemplate) => {
  const { t } = useTranslation("MainTemplate");
  const view = useServerView<IMainView>(initialView);

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
      initialFormNames={initialFormNames}
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
