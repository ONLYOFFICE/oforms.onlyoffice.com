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

import type { NextApiRequest, NextApiResponse } from "next";
import { getAllFormsAllLocales } from "@src/lib/requests/getAllFormsAllLocales";
import { buildFormNames } from "@src/lib/server/buildMainView";
import {
  isGetRequest,
  resolveLocale,
  VIEW_CACHE_CONTROL,
} from "@src/lib/server/apiHelpers";
import { getQueryValues } from "@src/utils/helpers";
import { TFormNames } from "@src/lib/server/mainView.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TFormNames | { error: string }>,
) {
  if (!isGetRequest(req, res)) return;

  const locale = resolveLocale(req.query.locale);

  try {
    const allForms = await getAllFormsAllLocales(locale);

    const formNames = buildFormNames(
      allForms.data,
      locale,
      getQueryValues(req.query.country),
    );

    res.setHeader("Cache-Control", VIEW_CACHE_CONTROL);

    return res.status(200).json(formNames);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[api/form-names]", message);

    return res.status(500).json({ error: "Failed to load template names" });
  }
}
