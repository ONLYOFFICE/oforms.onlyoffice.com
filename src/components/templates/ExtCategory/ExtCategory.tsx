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
import { useRouter } from "next/router";
import { IExtCategory } from "@src/types/template";
import { Main } from "@src/components/modules/Main";
import { MainSection } from "@src/components/modules/Main/sub-components/MainSection";
import {
  getExtCount,
  getPurposes,
  getCategoriesByPurpose,
  getQueryValues,
  getTemplatesByExt,
  getPopularTemplates,
  normalizeSortKey,
  sortForms,
} from "@src/utils/helpers";
import { TAllowedTypes } from "@src/utils/allowedTypes";

const EXT_TEMPLATES_LABEL_KEY: Record<TAllowedTypes, string> = {
  docx: "DocumentTemplates",
  xlsx: "SpreadsheetTemplates",
  pptx: "PresentationTemplates",
  pdf: "PdfFormsTemplates",
};

const ExtCategoryTemplate = ({
  ext,
  allForms,
  extFormsCount,
  countriesCount,
  purposeWithCategoriesCount,
}: IExtCategory) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();

  const sortKey = normalizeSortKey(router.query.sort);
  const extForms = allForms.data.filter((form) =>
    form.form_exts?.some((item) => item.ext === ext),
  );
  const filteredForms = sortForms(extForms, sortKey);
  const popularTemplates = getPopularTemplates(filteredForms);
  const docxForms = getExtCount(extFormsCount, "docx");
  const xlsxForms = getExtCount(extFormsCount, "xlsx");
  const pptxForms = getExtCount(extFormsCount, "pptx");
  const pdfForms = getExtCount(extFormsCount, "pdf");
  const countries = countriesCount.data
    .filter((country) => country.oforms.count > 0)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )
    .map((country) => ({
      id: country.id,
      documentId: country.documentId,
      name: country.name,
      code: country.code,
      count: country.oforms.count,
    }));
  const availableCountryCodes = new Set(
    countries.map((country) => country.code.toLowerCase()),
  );
  const selectedCountries = getQueryValues(router.query.country).filter(
    (country) => availableCountryCodes.has(country),
  );
  const purposes = getPurposes(purposeWithCategoriesCount);
  const categoriesByPurpose = getCategoriesByPurpose(
    purposeWithCategoriesCount,
    selectedCountries,
  );
  const totalCount = filteredForms.length;
  const formNames = allForms.data.map(({ id, name_form, url }) => ({
    id,
    name_form,
    url,
  }));

  return (
    <Main
      docxForms={docxForms}
      xlsxForms={xlsxForms}
      pptxForms={pptxForms}
      pdfForms={pdfForms}
      countries={countries}
      purposes={purposes}
      categoriesByPurpose={categoriesByPurpose}
      totalCount={totalCount}
      selectedType={ext}
      formNames={formNames}
    >
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
