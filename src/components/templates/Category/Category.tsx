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
import { ICategoryTemplate } from "./Category.types";
import { Main } from "@src/components/modules/Main";
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

const CategoryTemplate = ({
  popularForms,
  typeFormsCount,
  ext,
  data,
  categories,
  types,
  compilations,
  subCategoryForms,
}: ICategoryTemplate) => {
  const { t } = useTranslation("MainTemplate");
  const router = useRouter();

  const SECTION_CONFIG = {
    docx: { label: t("DocumentTemplates"), href: "/document-templates" },
    xlsx: {
      label: t("SpreadsheetTemplates"),
      href: "/spreadsheet-templates",
    },
    pptx: {
      label: t("PresentationTemplates"),
      href: "/presentation-templates",
    },
    pdf: { label: t("PdfFormsTemplates"), href: "/pdf-form-templates" },
  };

  const { label, href } = SECTION_CONFIG[ext];

  const selectedTaxonomyCount = sumSelectedTaxonomyCount(
    router.query,
    categories,
    types,
    compilations,
  );
  const totalCount =
    selectedTaxonomyCount > 0
      ? selectedTaxonomyCount
      : (subCategoryForms?.meta.pagination.total ??
        data?.meta.pagination.total ??
        0);

  const subCategoryAttributes = getSubCategoryAttributes(subCategoryForms);

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
      categories={categories}
      types={types}
      compilations={compilations}
      totalCount={totalCount}
      data={data}
      ext={ext}
    >
      {popularForms?.meta.pagination.total > 0 && (
        <MainSection label={t("PopularTemplates")} data={popularForms?.data} />
      )}
      {selectedSubCategories.length > 0 ? (
        selectedSubCategories.map(({ relation, id }) => {
          const isActive =
            relation === activeSubCategoryRelation &&
            id === activeSubCategoryId;

          return (
            <InfinitySection
              key={`${relation}-${id}`}
              subCategory={{ relation, id }}
              loadOnClient={!isActive}
              data={
                isActive && subCategoryForms
                  ? subCategoryForms
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
              ext={ext}
            />
          );
        })
      ) : (
        <InfinitySection
          key={href}
          label={label}
          href={href}
          ext={ext}
          data={data}
        />
      )}
    </Main>
  );
};

export { CategoryTemplate };
