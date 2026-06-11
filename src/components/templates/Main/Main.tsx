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
import { IMainTemplate, EXT_ORDER } from "./Main.types";
import { Main } from "@src/components/modules/Main";
import { FILTER_PARAMS } from "@src/components/modules/Main/Main.constants";
import {
  getActiveSubCategoryId,
  getActiveSubCategoryRelation,
  getSelectedSubCategories,
  getSubCategoryAttributes,
  sumSelectedTaxonomyCount,
} from "@src/components/modules/Main/Main.utils";
import {
  MainSection,
  InfinitySection,
} from "@src/components/modules/Main/sub-components/MainSection";
import { TExt } from "@src/components/modules/Main/Main.types";

const MainTemplate = ({
  popularForms,
  typeFormsCount,
  docxForms,
  pdfForms,
  xlsxForms,
  pptxForms,
  categories,
  types,
  compilations,
  salesTemplates,
  subCategoryForms,
  typeWithSubCategoryForms,
}: IMainTemplate) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();

  const hasFilterParams = FILTER_PARAMS.some((key) => {
    const value = router.query[key];
    return value !== undefined && String(value).length > 0;
  });

  const typeValues = router.query.type
    ? String(router.query.type)
        .split(",")
        .map((v) => v.trim())
        .filter((v): v is TExt => (EXT_ORDER as string[]).includes(v))
    : [];

  const SECTION_CONFIG = {
    docx: {
      label: t("DocumentTemplates"),
      href: "/document-templates",
      data: docxForms,
    },
    xlsx: {
      label: t("SpreadsheetTemplates"),
      href: "/spreadsheet-templates",
      data: xlsxForms,
    },
    pptx: {
      label: t("PresentationTemplates"),
      href: "/presentation-templates",
      data: pptxForms,
    },
    pdf: {
      label: t("PdfFormsTemplates"),
      href: "/pdf-form-templates",
      data: pdfForms,
    },
  };

  const orderedExts = typeValues.length > 0 ? typeValues : EXT_ORDER;
  const subCategoryData = subCategoryForms ?? typeWithSubCategoryForms;

  const getCountByExt = (ext: string) =>
    typeFormsCount?.data?.find((item) => item.attributes.ext === ext)
      ?.attributes.oforms.data.attributes.count ?? 0;

  const selectedTaxonomyCount = sumSelectedTaxonomyCount(
    router.query,
    categories,
    types,
    compilations,
  );

  const totalCount =
    selectedTaxonomyCount > 0
      ? selectedTaxonomyCount
      : (subCategoryData?.meta.pagination.total ??
        (typeValues.length > 0
          ? typeValues.reduce((sum, ext) => sum + getCountByExt(ext), 0)
          : EXT_ORDER.reduce(
              (sum, ext) =>
                sum +
                ({
                  docx: docxForms,
                  xlsx: xlsxForms,
                  pptx: pptxForms,
                  pdf: pdfForms,
                }[ext]?.meta.pagination.total ?? 0),
              0,
            )));

  const subCategoryAttributes = getSubCategoryAttributes(subCategoryData);

  const activeSubCategoryRelation = getActiveSubCategoryRelation(
    subCategoryAttributes,
  );

  const activeSubCategoryId = getActiveSubCategoryId(
    router.query,
    activeSubCategoryRelation,
  );

  const selectedSubCategories = getSelectedSubCategories(router.query);

  return (
    <Main
      typeFormsCount={typeFormsCount}
      docxForms={docxForms}
      xlsxForms={xlsxForms}
      pptxForms={pptxForms}
      pdfForms={pdfForms}
      categories={categories}
      types={types}
      compilations={compilations}
      totalCount={totalCount}
    >
      {popularForms?.meta.pagination.total > 0 && (
        <MainSection label={t("PopularTemplates")} data={popularForms?.data} />
      )}
      {!hasFilterParams && salesTemplates.data.length > 0 && (
        <MainSection
          label={salesTemplates?.data[0]?.attributes.categorie}
          href={`/form/${salesTemplates?.data[0]?.attributes.urlReq}`}
          data={salesTemplates?.data[0]?.attributes.oforms.data}
          desktopLimit={true}
        />
      )}
      {selectedSubCategories.length > 0
        ? selectedSubCategories.map(({ relation, id }) => {
            const isActive =
              relation === activeSubCategoryRelation &&
              id === activeSubCategoryId;

            return (
              <InfinitySection
                key={`${relation}-${id}`}
                subCategory={{ relation, id }}
                loadOnClient={!isActive}
                data={
                  isActive && subCategoryData
                    ? subCategoryData
                    : {
                        data: [],
                        meta: {
                          pagination: {
                            page: 1,
                            pageCount: 0,
                            pageSize: 8,
                            total: 0,
                          },
                        },
                      }
                }
              />
            );
          })
        : orderedExts.map((ext) => {
            const { label, href, data } = SECTION_CONFIG[ext];

            if (!hasFilterParams) {
              return (
                <MainSection
                  key={href}
                  label={label}
                  href={href}
                  data={data?.data}
                />
              );
            }

            if (!data) {
              return (
                <InfinitySection
                  key={href}
                  label={label}
                  href={href}
                  ext={ext}
                  loadOnClient
                  data={{
                    data: [],
                    meta: {
                      pagination: {
                        page: 1,
                        pageCount: 0,
                        pageSize: 8,
                        total: 0,
                      },
                    },
                  }}
                />
              );
            }

            return (
              <InfinitySection
                key={href}
                label={label}
                href={href}
                ext={ext}
                data={data}
              />
            );
          })}
    </Main>
  );
};

export { MainTemplate };
