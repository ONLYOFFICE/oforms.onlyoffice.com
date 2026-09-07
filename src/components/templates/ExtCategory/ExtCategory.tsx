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
import { useRouter } from "next/router";
import { IExtCategory } from "@src/types/template";
import { Main } from "@src/components/modules/Main";
import { MainSection } from "@src/components/modules/Main/sub-components/MainSection";
import { NoResultsFound } from "@src/components/modules/NoResultsFound";
import { Button } from "@src/components/ui/Button";
import {
  getQueryValues,
  getTemplatesByExt,
  getPopularTemplates,
  normalizeSortKey,
  sortForms,
} from "@src/utils/helpers";
import {
  getCategoriesByPurpose,
  getFilteredForms,
  getFormsInScope,
  getPurposes,
  groupFormsByExt,
} from "@src/components/templates/Main/Main.utils";
import { TAllowedTypes } from "@src/utils/allowedTypes";
import { getSelectedCountries } from "@src/utils/localeCountry";
import styles from "@src/components/templates/Main/Main.module.scss";

const EXT_TEMPLATES_LABEL_KEY: Record<TAllowedTypes, string> = {
  docx: "DocumentTemplates",
  xlsx: "SpreadsheetTemplates",
  pptx: "PresentationTemplates",
  pdf: "PdfFormsTemplates",
};

const ExtCategoryTemplate = ({
  ext,
  allForms,
  countriesCount,
}: IExtCategory) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();
  const currentLocale = router.locale ?? "en";

  const sortKey = normalizeSortKey(router.query.sort);
  const selectedCountries = getSelectedCountries(
    getQueryValues(router.query.country),
    currentLocale,
    countriesCount.map((country) => country.code),
  );
  const selectedSubcategories = getQueryValues(router.query.subcategory);

  const localeForms = getFormsInScope(
    allForms.data,
    currentLocale,
    selectedCountries,
  );
  const scopedForms = getFilteredForms(localeForms, { type: [ext] });

  const formsForTypeFilter = getFilteredForms(localeForms, {
    country: selectedCountries,
    subcategory: selectedSubcategories,
  });
  const formsForCategoryFilter = getFilteredForms(scopedForms, {
    country: selectedCountries,
  });

  const filteredForms = sortForms(
    getFilteredForms(scopedForms, {
      country: selectedCountries,
      subcategory: selectedSubcategories,
    }),
    sortKey,
  );
  const popularTemplates = getPopularTemplates(filteredForms);

  const {
    docx: docxForms,
    xlsx: xlsxForms,
    pptx: pptxForms,
    pdf: pdfForms,
  } = groupFormsByExt(formsForTypeFilter);
  const categoriesByPurpose = getCategoriesByPurpose(formsForCategoryFilter);
  const purposes = getPurposes(allForms.data).filter(
    (purpose) => categoriesByPurpose[purpose.key]?.length,
  );
  const totalCount = filteredForms.length;
  const formNames = getFilteredForms(scopedForms, {
    country: selectedCountries,
  }).map(({ id, name_form, url, locale }) => ({
    id,
    name_form,
    url,
    locale,
  }));

  return (
    <Main
      docxForms={docxForms.length}
      xlsxForms={xlsxForms.length}
      pptxForms={pptxForms.length}
      pdfForms={pdfForms.length}
      countries={countriesCount}
      purposes={purposes}
      categoriesByPurpose={categoriesByPurpose}
      totalCount={totalCount}
      selectedType={ext}
      formNames={formNames}
      searchOnly={filteredForms.length === 0}
    >
      {!filteredForms.length && (
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

      {popularTemplates.length > 0 && (
        <MainSection label={t("PopularTemplates")} data={popularTemplates} />
      )}

      {(() => {
        const data = getTemplatesByExt(filteredForms, ext, Infinity);

        return data.length > 0 ? (
          <MainSection label={t(EXT_TEMPLATES_LABEL_KEY[ext])} data={data} />
        ) : null;
      })()}
    </Main>
  );
};

export { ExtCategoryTemplate };
