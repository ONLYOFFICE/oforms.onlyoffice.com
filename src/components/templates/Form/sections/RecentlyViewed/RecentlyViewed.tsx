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

import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
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
    typeof form.form_exts === "string"
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
}: IRecentlyViewed) => {
  const { t } = useTranslation("form");
  const router = useRouter();
  const locale = router.locale;
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
  }, [id, name_form, description_card, url, card_prewiew, form_exts, locale]);

  if (recentForms.length === 0) return null;

  return <SliderSection heading={t("RecentlyViewed")} data={recentForms} />;
};

export { RecentlyViewed };
