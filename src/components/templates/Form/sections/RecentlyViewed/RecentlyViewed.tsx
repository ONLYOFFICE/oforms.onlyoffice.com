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

import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { SliderSection } from "../../sub-components/SliderSection";
import { IRecentlyViewed, IRecentlyViewedForm } from "./RecentlyViewed.types";
import { IFormsData } from "@src/types/data";

type IFormsDataItem = IFormsData["data"][0];

const MAX_FORMS = 16;

const RecentlyViewed = ({ allForms, id }: IRecentlyViewed) => {
  const { t } = useTranslation("form");
  const router = useRouter();
  const locale = router.locale;
  const [recentForms, setRecentForms] = useState<IRecentlyViewedForm[]>([]);

  useEffect(() => {
    const localStorageKey = `recentForms_${locale}`;
    const formsById = new Map(allForms.data.map((form) => [form.id, form]));

    let recentIds: number[] = [];
    try {
      recentIds = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    } catch {
      recentIds = [];
    }

    recentIds = recentIds.filter(
      (recentId) => recentId !== id && formsById.has(recentId),
    );
    recentIds.unshift(id);
    recentIds = recentIds.slice(0, MAX_FORMS);
    localStorage.setItem(localStorageKey, JSON.stringify(recentIds));

    const freshRecentForms = recentIds
      .filter((recentId) => recentId !== id)
      .map((recentId) => formsById.get(recentId))
      .filter((form): form is IFormsDataItem => form !== undefined)
      .map((form) => ({
        id: form.id,
        name_form: form.name_form,
        description_card: form.description_card,
        url: form.url,
        card_prewiew: form.card_prewiew.url,
        form_exts: form.form_exts[0].ext,
      }));

    setRecentForms(freshRecentForms);
  }, [id, allForms, locale]);

  if (recentForms.length === 0) return null;

  return <SliderSection heading={t("RecentlyViewed")} data={recentForms} />;
};

export { RecentlyViewed };
