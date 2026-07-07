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
import {
  getCategoriesByPurpose,
  getCountries,
  getFilteredCount,
  getFilteredForms,
  getFormsByTypes,
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
import { TAllowedTypes } from "@src/utils/allowedTypes";

const TYPE_SECTIONS: {
  ext: TAllowedTypes;
  labelKey: string;
  href: string;
}[] = [
  { ext: "docx", labelKey: "DocumentTemplates", href: "/document-templates" },
  {
    ext: "xlsx",
    labelKey: "SpreadsheetTemplates",
    href: "/spreadsheet-templates",
  },
  {
    ext: "pptx",
    labelKey: "PresentationTemplates",
    href: "/presentation-templates",
  },
  { ext: "pdf", labelKey: "PdfFormsTemplates", href: "/pdf-form-templates" },
];

const CATEGORY_SECTIONS: string[] = [
  "contracts-legal",
  "finance",
  "sales-marketing",
];

const MainTemplate = ({ allForms }: IMainTemplate) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();

  const selectedTypes = getQueryValues(router.query.type);
  const selectedCountries = getQueryValues(router.query.country);
  const selectedSubcategories = getQueryValues(router.query.subcategory);
  const sortKey = normalizeSortKey(router.query.sort);
  const formsByType = getFormsByTypes(allForms.data, selectedTypes);
  const formsByTypeAndCountry = getFilteredForms(allForms.data, {
    type: selectedTypes,
    country: selectedCountries,
  });
  const filteredForms = sortForms(
    getFilteredForms(allForms.data, {
      type: selectedTypes,
      country: selectedSubcategories.length ? selectedCountries : [],
      subcategory: selectedSubcategories,
    }),
    sortKey,
  );
  const popularTemplates = getPopularTemplates(filteredForms);
  const categorySections = CATEGORY_SECTIONS.map((urlReq) =>
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
  } = groupFormsByExt(allForms.data);
  const countries = getCountries(formsByType);
  const purposes = getPurposes(allForms.data);
  const categoriesByPurpose = getCategoriesByPurpose(formsByTypeAndCountry);
  const totalCount = getFilteredCount(allForms.data, {
    type: selectedTypes,
    country: selectedSubcategories.length ? selectedCountries : [],
    subcategory: selectedSubcategories,
  });
  const formNames = allForms.data.map(({ id, name_form, url }) => ({
    id,
    name_form,
    url,
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
    >
      {popularTemplates.length > 0 && (
        <MainSection label={t("PopularTemplates")} data={popularTemplates} />
      )}

      {!selectedSubcategories.length &&
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
