import { useRouter } from "next/router";
import { Trans, useTranslation } from "react-i18next";
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
import { ALLOWED_TYPES, TAllowedTypes } from "@src/utils/allowedTypes";
import { MainSection } from "@src/components/modules/Main/sub-components/MainSection";
import { Main } from "@src/components/modules/Main";
import { SearchNoResult } from "@src/components/templates/SearchResult/sections/SearchNoResult";
import { ITemplate } from "./Template.types";

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

// Templates that ship with the desktop (__local, see embed/src/localSdk.ts)
// always come first, whatever the sort — they're the ones that open without
// internet, and the catalog sort would otherwise bury them: they carry an
// epoch createdAt, so the default "newest first" pushed them to the very
// bottom of every section. Two filter passes keep each group in the order
// sortForms produced.
const isLocal = (form: unknown) => !!(form as { __local?: boolean })?.__local;

const localFirst = <T,>(forms: T[]): T[] => [
  ...forms.filter(isLocal),
  ...forms.filter((form) => !isLocal(form)),
];

const CATEGORY_SECTIONS: string[] = [
  "contracts-legal",
  "finance",
  "sales-marketing",
];

const Template = ({ data, isEmbed, searchQuery = "" }: ITemplate) => {
  const { t: tMain } = useTranslation("MainTemplate");
  const { t: tSearch } = useTranslation("searchresult");
  const router = useRouter();

  const selectedTypes = getQueryValues(router.query.type).filter(
    (type): type is TAllowedTypes => ALLOWED_TYPES.includes(type),
  );
  const availableCountryCodes = new Set(
    data.data.flatMap(
      (form) =>
        form.countries?.map((country) => country.code.toLowerCase()) ?? [],
    ),
  );
  const selectedCountries = getQueryValues(router.query.country).filter(
    (country) => availableCountryCodes.has(country),
  );
  const availableSubcategoryUrlReqs = new Set(
    data.data.flatMap(
      (form) => form.subcategories?.map((sub) => sub.urlReq) ?? [],
    ),
  );
  const selectedSubcategories = getQueryValues(router.query.subcategory).filter(
    (subcategory) => availableSubcategoryUrlReqs.has(subcategory),
  );
  const sortKey = normalizeSortKey(router.query.sort);
  const formsByType = getFormsByTypes(data.data, selectedTypes);
  const formsByTypeAndCountry = getFilteredForms(data.data, {
    type: selectedTypes,
    country: selectedCountries,
  });
  const filteredForms = localFirst(
    sortForms(
      getFilteredForms(data.data, {
        type: selectedTypes,
        country: selectedSubcategories.length ? selectedCountries : [],
        subcategory: selectedSubcategories,
      }),
      sortKey,
    ),
  );

  const query = searchQuery.trim();
  const isSearch = query.length > 0;
  const foundForms = isSearch
    ? filteredForms.filter((form) =>
        form.name_form.toLowerCase().includes(query.toLowerCase()),
      )
    : [];
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
  } = groupFormsByExt(data.data);
  const countries = getCountries(formsByType);
  const purposes = getPurposes(data.data);
  const categoriesByPurpose = getCategoriesByPurpose(formsByTypeAndCountry);
  const totalCount = isSearch
    ? foundForms.length
    : getFilteredCount(data.data, {
        type: selectedTypes,
        country: selectedSubcategories.length ? selectedCountries : [],
        subcategory: selectedSubcategories,
      });
  const formNames = data.data.map(({ id, name_form, url }) => ({
    id,
    name_form,
    url,
  }));

  return (
    <Main
      isEmbed={isEmbed}
      docxForms={docxForms.length}
      xlsxForms={xlsxForms.length}
      pptxForms={pptxForms.length}
      pdfForms={pdfForms.length}
      countries={countries}
      purposes={purposes}
      categoriesByPurpose={categoriesByPurpose}
      totalCount={totalCount}
      formNames={formNames}
      searchOnly={isSearch && foundForms.length === 0}
    >
      {isSearch ? (
        foundForms.length > 0 ? (
          <MainSection
            label={
              <Trans
                t={tSearch}
                i18nKey="SearchResultsFor"
                values={{ searchQuery: query }}
              />
            }
            data={foundForms}
            isEmbed={isEmbed}
          />
        ) : (
          <SearchNoResult filteredForms={filteredForms} />
        )
      ) : (
        <>
          {popularTemplates.length > 0 && (
            <MainSection
              label={tMain("PopularTemplates")}
              data={popularTemplates}
              isEmbed={isEmbed}
            />
          )}

          {!selectedSubcategories.length &&
            categorySections.map((section) => (
              <MainSection
                key={section.category.id}
                label={section.category.name}
                href={undefined}
                data={section.data}
                isEmbed={isEmbed}
              />
            ))}

          {selectedSubcategories.length
            ? getTemplatesBySubcategories(
                filteredForms,
                selectedSubcategories,
              ).map(({ subcategory, data }) => (
                <MainSection
                  key={subcategory.id}
                  label={subcategory.name}
                  data={data}
                  isEmbed={isEmbed}
                />
              ))
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
                    label={tMain(section.labelKey)}
                    href={undefined}
                    data={data}
                    isEmbed={isEmbed}
                  />
                ))}
        </>
      )}
    </Main>
  );
};

export { Template };
