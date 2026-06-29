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
import { Container } from "@src/components/ui/Container";
import { Breadcrumbs } from "./sub-components/Breadcrumbs";
import { Hero } from "./sections/Hero";
import { HowToCreate } from "./sections/HowToCreate";
import { RecentlyViewed } from "./sections/RecentlyViewed";
import { ExploreOtherTemplate } from "./sections/ExploreOtherTemplate";
import { PopularCategories } from "./sections/PopularCategories";
import { BuildYourOwnForms } from "./sections/BuildYourOwnForms";
import { IFormTemplate } from "./Form.types";
import styles from "./Form.module.scss";

const FormTemplate = ({ form, categories }: IFormTemplate) => {
  const { t } = useTranslation("form");
  const router = useRouter();
  const { locale } = router;
  const {
    name_form,
    description_card,
    template_desc,
    file_oform,
    file_pages,
    page_screens,
    card_prewiew,
    url,
    form_exts,
  } = form.data[0];
  const pdfFile = file_oform?.filter(
    (it) => it?.name.split(".").pop() === "pdf",
  );
  const linkPdfEditor = `editor?lang=${locale}&filename=${url}&fillform=${pdfFile?.[0]?.hash}.pdf`;

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
        linkPdfEditor={linkPdfEditor}
      />
      <HowToCreate name_form={name_form} linkPdfEditor={linkPdfEditor} />
      <RecentlyViewed
        id={form.data[0].id}
        name_form={name_form}
        description_card={description_card}
        url={url}
        card_prewiew={card_prewiew.url}
        form_exts={form_exts[0].ext}
      />
      <ExploreOtherTemplate />
      <PopularCategories categories={categories} />
      <BuildYourOwnForms />
    </div>
  );
};

export { FormTemplate };
