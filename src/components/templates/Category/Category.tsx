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
import { IFormsData } from "@src/types/data";
import { Main } from "@src/components/modules/Main";
import { MainSection } from "@src/components/modules/Main/sub-components/MainSection";
import { NoResultsFound } from "@src/components/modules/NoResultsFound";
import { Button } from "@src/components/ui/Button";
import {
  getQueryValues,
  getPopularTemplates,
  normalizeSortKey,
  sortForms,
} from "@src/utils/helpers";
import {
  getCategoriesByPurpose,
  getCountries,
  getFilteredForms,
  getFormsInScope,
  getPurposes,
  getTemplatesBySubcategories,
  groupFormsByExt,
} from "@src/components/templates/Main/Main.utils";
import { getSelectedCountries } from "@src/utils/localeCountry";
import styles from "@src/components/templates/Main/Main.module.scss";

const CategoryTemplate = ({
  allForms,
  countryNames,
  categoryUrlReq,
}: ICategory) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();
  const currentLocale = router.locale ?? "en";

  const isInCategory = (form: IFormsData["data"][number]) =>
    form.subcategories?.some((sub) =>
      sub?.parent_categories?.some((cat) => cat?.urlReq === categoryUrlReq),
    );

  const categoryForms = allForms.data?.filter(isInCategory);
  const countries = getCountries(categoryForms, countryNames);

  const sortKey = normalizeSortKey(router.query.sort);
  const selectedTypes = getQueryValues(router.query.type);
  const selectedCountries = getSelectedCountries(
    getQueryValues(router.query.country),
    currentLocale,
    countries.map((country) => country.code.toLowerCase()),
  );

  const localeForms = getFormsInScope(
    allForms.data,
    currentLocale,
    selectedCountries,
  ).filter(isInCategory);
  const scopedForms = getFilteredForms(localeForms, {
    country: selectedCountries,
  });

  const filteredForms = sortForms(
    getFilteredForms(scopedForms, { type: selectedTypes }),
    sortKey,
  );

  const {
    docx: docxForms,
    xlsx: xlsxForms,
    pptx: pptxForms,
    pdf: pdfForms,
  } = groupFormsByExt(scopedForms);
  const categoriesByPurpose = getCategoriesByPurpose(filteredForms);
  const purposes = getPurposes(allForms.data).filter(
    (purpose) => categoriesByPurpose[purpose.key]?.length,
  );
  const formNames = scopedForms.map(({ id, name_form, url, locale }) => ({
    id,
    name_form,
    url,
    locale,
  }));

  const subcategoryUrlReqs = Array.from(
    new Set(
      filteredForms.flatMap(
        (form) =>
          form.subcategories
            ?.filter((sub) =>
              sub?.parent_categories?.some(
                (cat) => cat?.urlReq === categoryUrlReq,
              ),
            )
            .map((sub) => sub.urlReq) ?? [],
      ),
    ),
  );
  const subcategorySections = getTemplatesBySubcategories(
    filteredForms,
    subcategoryUrlReqs,
  );
  const totalCount = filteredForms.length;
  const popularTemplates = getPopularTemplates(filteredForms);

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
      selectedCategory={categoryUrlReq}
      formNames={formNames}
      searchOnly={subcategorySections.length === 0}
    >
      {!subcategorySections.length && (
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
      {subcategorySections.map(({ subcategory, data }) => (
        <MainSection
          key={subcategory.id}
          label={subcategory.name}
          data={data}
        />
      ))}
    </Main>
  );
};

export { CategoryTemplate };
