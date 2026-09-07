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

import { useTranslation, Trans } from "next-i18next";
import { useRouter } from "next/router";
import { ISearchResult } from "@src/types/template";
import { Main } from "@src/components/modules/Main";
import { MainSection } from "@src/components/modules/Main/sub-components/MainSection";
import {
  getQueryValues,
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
import { getSelectedCountries } from "@src/utils/localeCountry";
import { SearchNoResult } from "./sections/SearchNoResult";

const SearchResultTemplate = ({ allForms, countriesCount }: ISearchResult) => {
  const { t } = useTranslation("searchresult");
  const router = useRouter();
  const currentLocale = router.locale ?? "en";

  const sortKey = normalizeSortKey(router.query.sort);
  const selectedTypes = getQueryValues(router.query.type);
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
  const scopedForms = getFilteredForms(localeForms, {
    country: selectedCountries,
  });

  const filteredForms = sortForms(scopedForms, sortKey);
  const searchQuery = (
    Array.isArray(router.query.query)
      ? router.query.query[0]
      : (router.query.query ?? "")
  ).trim();
  const foundForms = searchQuery
    ? filteredForms.filter((form) =>
        form.name_form.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const {
    docx: docxForms,
    xlsx: xlsxForms,
    pptx: pptxForms,
    pdf: pdfForms,
  } = groupFormsByExt(
    getFilteredForms(localeForms, {
      country: selectedCountries,
      subcategory: selectedSubcategories,
    }),
  );
  const categoriesByPurpose = getCategoriesByPurpose(
    getFilteredForms(scopedForms, { type: selectedTypes }),
  );
  const purposes = getPurposes(allForms.data).filter(
    (purpose) => categoriesByPurpose[purpose.key]?.length,
  );
  const totalCount = foundForms.length;
  const formNames = filteredForms.map(({ id, name_form, url, locale }) => ({
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
      formNames={formNames}
      searchOnly={foundForms.length === 0}
    >
      {foundForms.length > 0 ? (
        <MainSection
          label={
            <Trans t={t} i18nKey="SearchResultsFor" values={{ searchQuery }} />
          }
          data={foundForms}
        />
      ) : (
        <SearchNoResult filteredForms={filteredForms} />
      )}
    </Main>
  );
};

export { SearchResultTemplate };
