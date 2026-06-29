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
import { ICategory } from "@src/types/template";
import { Main } from "@src/components/modules/Main";
import { MainSection } from "@src/components/modules/Main/sub-components/MainSection";
import {
  getExtCount,
  getPurposes,
  getCategoriesByPurpose,
  getQueryValues,
  getPopularTemplates,
  normalizeSortKey,
  sortForms,
} from "@src/utils/helpers";

const CategoryTemplate = ({
  categoryInfoWithForms,
  allForms,
  extFormsCount,
  countriesCount,
  purposeWithCategoriesCount,
}: ICategory) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();

  const sortKey = normalizeSortKey(router.query.sort);
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
  const selectedCountries = getQueryValues(router.query.country);
  const purposes = getPurposes(purposeWithCategoriesCount);
  const categoriesByPurpose = getCategoriesByPurpose(
    purposeWithCategoriesCount,
    selectedCountries,
  );
  const formNames = allForms.data.map(({ id, name_form, url }) => ({
    id,
    name_form,
    url,
  }));
  const subcategories = (categoryInfoWithForms.data[0]?.subcategories ?? [])
    .filter((subcategory) => subcategory.oforms.length > 0)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  const totalCount = subcategories.reduce(
    (sum, subcategory) => sum + subcategory.oforms.length,
    0,
  );
  const categoryForms = Array.from(
    new Map(
      subcategories
        .flatMap((subcategory) => subcategory.oforms)
        .map((form) => [form.id, form]),
    ).values(),
  );
  const popularTemplates = getPopularTemplates(
    sortForms(categoryForms, sortKey),
  );

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
      formNames={formNames}
    >
      {popularTemplates.length > 0 && (
        <MainSection label={t("PopularTemplates")} data={popularTemplates} />
      )}
      {subcategories.map((subcategory) => (
        <MainSection
          key={subcategory.id}
          label={subcategory.name}
          data={subcategory.oforms}
        />
      ))}
    </Main>
  );
};

export { CategoryTemplate };
