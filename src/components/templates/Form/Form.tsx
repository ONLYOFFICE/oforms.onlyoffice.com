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
import { ALLOWED_TYPES } from "@src/utils/allowedTypes";
import { IFormTemplate } from "./Form.types";
import styles from "./Form.module.scss";

const FormTemplate = ({ form, allForms, categories }: IFormTemplate) => {
  const { t } = useTranslation("form");
  const router = useRouter();
  const { locale } = router;
  const {
    name_form,
    template_desc,
    file_oform,
    file_pages,
    page_screens,
    url,
  } = form.data[0];

  const editableFile = file_oform?.find((it) => {
    const ext = it.name?.split(".").pop()?.toLowerCase();
    return ext !== undefined && ALLOWED_TYPES.includes(ext);
  });
  const extension = editableFile?.name?.split(".").pop()?.toLowerCase();
  const linkEditor =
    editableFile && extension
      ? `editor?lang=${locale}&filename=${url}&fillform=${editableFile.hash}.${extension}`
      : "";
  const suggestChangesLink = `mailto:marketing@onlyoffice.com?subject=${t("SuggestingChangesLink", { name: name_form })}&body=${t("SuggestingChangesLink", { name: name_form })}.`;

  return (
    <div className={styles["form-template"]}>
      <Container maxWidth="1452px">
        <Breadcrumbs
          items={[
            { label: t("MainTemplates"), href: "/" },
            { label: name_form },
          ]}
        />
      </Container>
      <Hero
        name_form={name_form}
        template_desc={template_desc}
        file_pages={file_pages}
        file_oform={file_oform}
        page_screens={page_screens}
        linkEditor={linkEditor}
        suggestChangesLink={suggestChangesLink}
      />
      <HowToCreate name_form={name_form} linkEditor={linkEditor} />
      <RecentlyViewed allForms={allForms} id={form.data[0].id} />
      <ExploreOtherTemplate />
      <PopularCategories categories={categories} />
      <BuildYourOwnForms suggestChangesLink={suggestChangesLink} />
    </div>
  );
};

export { FormTemplate };
