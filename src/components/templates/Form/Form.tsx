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
import { useBackHref } from "@src/lib/hooks/useBackQuery";
import { cardUrl, extOf } from "@src/utils/templateFiles";
import { IFormTemplate } from "./Form.types";
import styles from "./Form.module.scss";

const FormTemplate = ({ template, categories, cta }: IFormTemplate) => {
  const { t, i18n } = useTranslation(["form", "embed"]);
  const { locale } = useRouter();
  const editorLocale = i18n.language;
  const editorFormLocale = locale ?? editorLocale;
  const { meta } = template;
  const name_form = meta["card-title"];
  const formLangParam =
    editorFormLocale === editorLocale ? "" : `&formlang=${editorFormLocale}`;
  const linkEditor = `/editor?lang=${editorLocale}${formLangParam}&filename=${meta.slug}`;
  const backHref = useBackHref();
  const backQuery = backHref.split("?")[1];
  // The category page keeps the list's other filters, not its category or purpose.
  const categoryParams = new URLSearchParams(backQuery);
  categoryParams.delete("category");
  categoryParams.delete("purpose");
  const categoryQuery = categoryParams.toString();
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
              {
                label: t(`embed:CategoryNames.${meta.category}`),
                href: `/${meta.category}${categoryQuery ? `?${categoryQuery}` : ""}`,
                locale: editorLocale,
              },
              { label: name_form },
            ]}
          />
        </Container>
        <Hero
          template={template}
          cta={cta}
          linkEditor={linkEditor}
          suggestChangesLink={suggestChangesLink}
        />
        <HowToCreate name_form={name_form} linkEditor={linkEditor} />
        <RecentlyViewed
          id={template.id}
          name_form={name_form}
          description_card={meta["card-text"]}
          url={meta.slug}
          card_prewiew={cardUrl(template)}
          form_exts={extOf(template)}
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
