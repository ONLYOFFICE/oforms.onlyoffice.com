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

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { IMainTemplate } from "./Main.types";
import { Main } from "@src/components/modules/Main";
import { MainSection } from "@src/components/modules/Main/sub-components/MainSection";
import { NoResultsFound } from "@src/components/modules/NoResultsFound";
import { Button } from "@src/components/ui/Button";
import {
  getCategoriesByPurpose,
  getCountries,
  getFilteredCount,
  getFilteredForms,
  getFormsInScope,
  getPurposes,
  getTemplatesByParentCategory,
  getTemplatesBySubcategories,
  groupFormsByExt,
} from "@src/components/templates/Main/Main.utils";
import {
  getQueryValues,
  getTemplatesByExt,
  getPopularTemplates,
  normalizeSortKey,
  sortForms,
} from "@src/utils/helpers";
import { ALLOWED_TYPES, TAllowedTypes } from "@src/utils/allowedTypes";
import { getSelectedCountries } from "@src/utils/localeCountry";
import styles from "./Main.module.scss";

const TYPE_SECTIONS: {
  ext: TAllowedTypes;
  labelKey: string;
  href: string;
}[] = [
  { ext: "docx", labelKey: "DocumentTemplates", href: "/?type=docx" },
  {
    ext: "xlsx",
    labelKey: "SpreadsheetTemplates",
    href: "/?type=xlsx",
  },
  {
    ext: "pptx",
    labelKey: "PresentationTemplates",
    href: "/?type=pptx",
  },
  { ext: "pdf", labelKey: "PdfFormsTemplates", href: "/?type=pdf" },
];

const CATEGORY_SECTIONS: string[] = [
  "contracts-legal",
  "finance",
  "sales-marketing",
];

const MainTemplate = ({ allForms, countryNames }: IMainTemplate) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();
  const currentLocale = router.locale ?? "en";

  const selectedTypes = getQueryValues(router.query.type).filter(
    (type): type is TAllowedTypes => ALLOWED_TYPES.includes(type),
  );
  const queryCountries = getQueryValues(router.query.country);
  const selectedCountries = getSelectedCountries(
    queryCountries,
    currentLocale,
    getCountries(allForms.data).map((country) => country.code.toLowerCase()),
  );
  const sortKey = normalizeSortKey(router.query.sort);

  const scopedForms = getFormsInScope(
    allForms.data,
    currentLocale,
    selectedCountries,
  );

  const selectedSubcategories = getQueryValues(router.query.subcategory);

  const formsForTypeFilter = getFilteredForms(scopedForms, {
    country: selectedCountries,
    subcategory: selectedSubcategories,
  });
  const formsForCountryFilter = getFilteredForms(allForms.data, {
    type: selectedTypes,
    subcategory: selectedSubcategories,
  });
  const formsForCategoryFilter = getFilteredForms(scopedForms, {
    type: selectedTypes,
    country: selectedCountries,
  });
  const filteredForms = sortForms(
    getFilteredForms(scopedForms, {
      type: selectedTypes,
      country: selectedCountries,
      subcategory: selectedSubcategories,
    }),
    sortKey,
  );
  const popularTemplates = getPopularTemplates(filteredForms);
  const categorySections =
    selectedTypes.length || selectedSubcategories.length
      ? []
      : CATEGORY_SECTIONS.map((urlReq) =>
          getTemplatesByParentCategory(filteredForms, urlReq),
        ).filter(
          (section): section is NonNullable<typeof section> =>
            section !== null && section.data.length > 0,
        );
  const {
    docx: docxForms,
    xlsx: xlsxForms,
    pptx: pptxForms,
    pdf: pdfForms,
  } = groupFormsByExt(formsForTypeFilter);
  const countries = getCountries(formsForCountryFilter, countryNames);
  const categoriesByPurpose = getCategoriesByPurpose(formsForCategoryFilter);
  const purposes = getPurposes(allForms.data).filter(
    (purpose) => categoriesByPurpose[purpose.key]?.length,
  );
  const totalCount = getFilteredCount(scopedForms, {
    type: selectedTypes,
    country: selectedCountries,
    subcategory: selectedSubcategories,
  });
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
      countries={countries}
      purposes={purposes}
      categoriesByPurpose={categoriesByPurpose}
      totalCount={totalCount}
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

      {!selectedSubcategories.length &&
        !selectedTypes.length &&
        categorySections.map((section) => (
          <MainSection
            key={section.category.id}
            label={section.category.name}
            href={section.category.urlReq}
            data={section.data}
          />
        ))}

      {selectedSubcategories.length
        ? getTemplatesBySubcategories(filteredForms, selectedSubcategories).map(
            ({ subcategory, data }) => (
              <MainSection
                key={subcategory.id}
                label={subcategory.name}
                data={data}
              />
            ),
          )
        : (selectedTypes.length
            ? TYPE_SECTIONS.filter((section) =>
                selectedTypes.includes(section.ext),
              )
            : TYPE_SECTIONS
          )
            .map((section) => ({
              section,
              data: getTemplatesByExt(
                filteredForms,
                section.ext,
                selectedTypes.length ? Infinity : undefined,
              ),
            }))
            .filter(({ data }) => data.length > 0)
            .map(({ section, data }) => (
              <MainSection
                key={section.ext}
                label={t(section.labelKey)}
                href={section.href}
                data={data}
              />
            ))}
    </Main>
  );
};

export { MainTemplate };
