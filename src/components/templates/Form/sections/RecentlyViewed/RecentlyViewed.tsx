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
import { SliderSection } from "../../sub-components/SliderSection";
import { IRecentlyViewed, IRecentlyViewedForm } from "./RecentlyViewed.types";

const MAX_FORMS = 16;

const isStoredForm = (value: unknown): value is IRecentlyViewedForm => {
  if (typeof value !== "object" || value === null) return false;

  const form = value as Record<string, unknown>;
  return (
    typeof form.id === "number" &&
    typeof form.name_form === "string" &&
    typeof form.description_card === "string" &&
    typeof form.url === "string" &&
    typeof form.card_prewiew === "string" &&
    typeof form.form_exts === "string" &&
    (form.locale === undefined || typeof form.locale === "string")
  );
};

const readStoredForms = (key: string): IRecentlyViewedForm[] => {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(key) || "[]");

    return Array.isArray(stored) ? stored.filter(isStoredForm) : [];
  } catch {
    return [];
  }
};

const RecentlyViewed = ({
  id,
  name_form,
  description_card,
  url,
  card_prewiew,
  form_exts,
  locale: formLocale,
}: IRecentlyViewed) => {
  const { t, i18n } = useTranslation("form");
  const locale = i18n.language;
  const [recentForms, setRecentForms] = useState<IRecentlyViewedForm[]>([]);

  useEffect(() => {
    const localStorageKey = `recentForms_${locale}`;
    const currentForm = {
      id,
      name_form,
      description_card,
      url,
      card_prewiew,
      form_exts,
      ...(formLocale && { locale: formLocale }),
    };
    const storedForms = readStoredForms(localStorageKey).filter(
      (storedForm) => storedForm.id !== id,
    );

    try {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify([currentForm, ...storedForms].slice(0, MAX_FORMS)),
      );
    } catch {
      // Storage may be full or unavailable — the slider still renders.
    }

    setRecentForms(storedForms.slice(0, MAX_FORMS - 1));
  }, [id, name_form, description_card, url, card_prewiew, form_exts, formLocale, locale]);

  if (recentForms.length === 0) return null;

  return <SliderSection heading={t("RecentlyViewed")} data={recentForms} />;
};

export { RecentlyViewed };
