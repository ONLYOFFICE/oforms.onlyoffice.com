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
import { Container } from "@src/components/ui/Container";
import { Breadcrumbs } from "@src/components/widgets/Breadcrumbs";
import { Hero } from "./sections/Hero";
import { HowToCreate } from "./sections/HowToCreate";
import { RecentlyViewed } from "./sections/RecentlyViewed";
import { ExploreOtherTemplate } from "./sections/ExploreOtherTemplate";
import { PopularCategories } from "./sections/PopularCategories";
import { BuildYourOwnForms } from "./sections/BuildYourOwnForms";
import { FormSkeleton } from "./sub-components/FormSkeleton";
import { ALLOWED_TYPES } from "@src/utils/allowedTypes";
import { useBackHref } from "@src/lib/hooks/useBackQuery";
import { cmsLocale } from "@src/utils/cmsLocale";
import {
  COLLAPSE_QUERY_PARAM,
  EXPAND_QUERY_PARAM,
  parseQueryList,
  VISIBLE_SUBCATEGORIES_LIMIT,
} from "@src/utils/queryFilters";
import {
  ICategoryLocalization,
  ICategorySubcategory,
  IFormTemplate,
} from "./Form.types";
import styles from "./Form.module.scss";

const getHiddenSubcategories = (items: ICategorySubcategory[] = []) =>
  items
    .filter((item) => (item.oforms?.count ?? 0) > 0)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )
    .slice(VISIBLE_SUBCATEGORIES_LIMIT)
    .map((item) => item.urlReq);

const FormTemplate = ({ form, categories }: IFormTemplate) => {
  const { t, i18n } = useTranslation("form");
  const { locale } = useRouter();
  const editorLocale = i18n.language;
  const editorFormLocale = locale ?? editorLocale;
  const editorCmsLocale = cmsLocale(editorLocale).toLowerCase();
  const localize = <
    T extends {
      name: string;
      urlReq: string;
      localizations?: ICategoryLocalization[];
    },
  >(
    item: T,
  ): T | undefined => {
    if (editorLocale === editorFormLocale) return item;
    const localized = item.localizations?.find(
      (localization) => localization.locale?.toLowerCase() === editorCmsLocale,
    );
    return localized
      ? {
          ...item,
          name: localized.name,
          urlReq: localized.urlReq,
          ...(localized.subcategories && {
            subcategories: localized.subcategories,
          }),
        }
      : undefined;
  };
  const isDefined = <T,>(item: T | undefined): item is T => !!item;
  const {
    id,
    name_form,
    subcategories,
    template_desc,
    template_desc_2,
    description_card,
    card_prewiew,
    file_oform,
    file_pages,
    page_screens,
    form_exts,
    url,
  } = form.data[0];

  const validSubcategories = [
    ...new Map(
      subcategories
        ?.map((item) => {
          const localized = localize(item);
          return (
            localized && {
              ...localized,
              parent_categories: (item.parent_categories ?? [])
                .map((category) => {
                  const localizedCategory = localize(category);
                  if (!localizedCategory) return undefined;
                  const hidden = getHiddenSubcategories(
                    localizedCategory.subcategories,
                  );
                  return {
                    ...localizedCategory,
                    isCollapsible: hidden.length > 0,
                    hidesSubcategory: hidden.includes(localized.urlReq),
                  };
                })
                .filter(isDefined),
            }
          );
        })
        .filter(isDefined)
        .filter(
          (item) =>
            item.urlReq &&
            item.parent_categories.some((category) => category.urlReq),
        )
        .map((item) => [item.urlReq, item]),
    ).values(),
  ];
  const parentCategories = [
    ...new Map(
      validSubcategories
        .flatMap((item) => item.parent_categories ?? [])
        .filter((category) => category.urlReq)
        .map((category) => [category.urlReq, category]),
    ).values(),
  ];
  const subcategory = validSubcategories[0];
  const parentCategory = subcategory?.parent_categories.find(
    (category) => category.urlReq,
  );

  const editableFile = file_oform?.find((it) => {
    const ext = it.name?.split(".").pop()?.toLowerCase();
    return ext !== undefined && ALLOWED_TYPES.includes(ext);
  });
  const extension = editableFile?.name?.split(".").pop()?.toLowerCase();
  const formLangParam =
    editorFormLocale === editorLocale ? "" : `&formlang=${editorFormLocale}`;
  const linkEditor =
    editableFile && extension
      ? `/editor?lang=${editorLocale}${formLangParam}&filename=${url}&fillform=${editableFile.hash}.${extension}`
      : "";
  const backHref = useBackHref();
  const backQuery = backHref.split("?")[1];
  const buildBackParams = (base: Record<string, string> = {}) => {
    const params = new URLSearchParams(base);
    new URLSearchParams(backQuery).forEach((value, key) => {
      if (
        key !== "subcategory" &&
        key !== "purpose" &&
        !(key === COLLAPSE_QUERY_PARAM && !value) &&
        !(key in base)
      ) {
        params.append(key, value);
      }
    });
    return params.toString();
  };
  const backSearchParams = new URLSearchParams(backQuery);
  const mergeBackList = (param: string, keys: string[]) =>
    Array.from(
      new Set([...parseQueryList(backSearchParams.get(param) ?? ""), ...keys]),
    ).join(",");
  const getOpenedParam = (keys: string[]): Record<string, string> =>
    backSearchParams.get(COLLAPSE_QUERY_PARAM)
      ? { [COLLAPSE_QUERY_PARAM]: mergeBackList(COLLAPSE_QUERY_PARAM, keys) }
      : {};
  const getCategoryHref = ({
    urlReq,
    isCollapsible,
  }: (typeof parentCategories)[number]) => {
    const key = `category-${urlReq}`;
    const query = buildBackParams({
      ...getOpenedParam([key]),
      ...(isCollapsible && {
        [EXPAND_QUERY_PARAM]: mergeBackList(EXPAND_QUERY_PARAM, [key]),
      }),
    });
    return `/${urlReq}${query ? `?${query}` : ""}`;
  };
  const getSubcategoryHref = ({
    urlReq,
    parent_categories,
  }: (typeof validSubcategories)[number]) => {
    const opened = parent_categories.map(
      (category) => `category-${category.urlReq}`,
    );
    const expanded = parent_categories
      .filter((category) => category.hidesSubcategory)
      .map((category) => `category-${category.urlReq}`);
    return `/?${buildBackParams({
      subcategory: urlReq.toLowerCase(),
      ...getOpenedParam(opened),
      ...(expanded.length && {
        [EXPAND_QUERY_PARAM]: mergeBackList(EXPAND_QUERY_PARAM, expanded),
      }),
    })}`;
  };
  const suggestChangesLink = `mailto:marketing@onlyoffice.com?subject=${t("SuggestingChangesLink", { name: name_form })}&body=${t("SuggestingChangesLink", { name: name_form })}.`;

  return (
    <div className={styles["form-template"]}>
      <FormSkeleton className={styles["form-template-skeleton"]} />
      <div className={styles["form-template-content"]}>
        <Container maxWidth="1452px">
          <Breadcrumbs
            items={[
              {
                label: t("MainTemplates"),
                href: backHref,
                locale: editorLocale,
              },
              ...(parentCategory
                ? [
                    {
                      label: parentCategory.name,
                      href: getCategoryHref(parentCategory),
                      locale: editorLocale,
                      options: parentCategories.map((category) => ({
                        label: category.name,
                        href: getCategoryHref(category),
                        locale: editorLocale,
                      })),
                    },
                  ]
                : []),
              ...(subcategory
                ? [
                    {
                      label: subcategory.name,
                      href: getSubcategoryHref(subcategory),
                      locale: editorLocale,
                      options: validSubcategories.map((item) => ({
                        label: item.name,
                        href: getSubcategoryHref(item),
                        locale: editorLocale,
                      })),
                    },
                  ]
                : []),
              { label: name_form },
            ]}
          />
        </Container>
        <Hero
          name_form={name_form}
          template_desc={template_desc}
          template_desc_2={template_desc_2}
          file_pages={file_pages}
          file_oform={file_oform}
          page_screens={page_screens}
          linkEditor={linkEditor}
          suggestChangesLink={suggestChangesLink}
        />
        <HowToCreate name_form={name_form} linkEditor={linkEditor} />
        <RecentlyViewed
          id={id}
          name_form={name_form}
          description_card={description_card}
          url={url}
          card_prewiew={card_prewiew?.url}
          form_exts={form_exts?.[0]?.ext}
          locale={editorFormLocale}
        />
        <ExploreOtherTemplate />
        <PopularCategories categories={categories} />
        <BuildYourOwnForms suggestChangesLink={suggestChangesLink} />
      </div>
    </div>
  );
};

export { FormTemplate };
