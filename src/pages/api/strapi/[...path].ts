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
import { getCatalog } from "@src/lib/requests/getTemplates";
import { getSingle } from "@src/lib/server/apiHelpers";
import {
  categoryName,
  collatorFor,
  purposeName,
} from "@src/lib/server/catalogNames";
import {
  getCategoriesByPurpose,
  getFilteredForms,
} from "@src/components/templates/Main/Main.utils";
import { sortForms, TSortKey } from "@src/utils/helpers";
import { normalizeSearchQuery } from "@src/utils/searchQuery";
import { cardUrl, extOf, fileName, fileUrl } from "@src/utils/templateFiles";
import { TCatalogItem } from "@src/types/room";

// Answers, from the room catalog, what old clients still ask Strapi: DocSpace 4.0 its v5 API at
// /dashboard/v2/api, Desktop 9.0–9.4 the v4 /dashboard/api/oforms. The keys are Strapi's codes.
const LOCALES: Record<string, string> = {
  en: "en",
  it: "it",
  fr: "fr",
  de: "de",
  es: "es",
  ja: "ja",
  "pt-BR": "pt",
  ar: "ar",
  "zh-CN": "zh",
};

// The site's "asc" is newest first.
const SORT: Record<string, TSortKey> = {
  "name_form:asc": "name_asc",
  "name_form:desc": "name_desc",
  "updatedAt:desc": "asc",
  "updatedAt:asc": "desc",
};

const SEARCH = "filters[name_form][$containsi]";
const EXTENSION = "filters[form_exts][ext][$eq]";
const CATEGORY = "filters[subcategories][parent_categories][documentId][$in]";
const PURPOSE = "filters[subcategories][parent_categories][purpose][key][$eq]";
const COUNT_EXTENSION =
  "populate[parent_categories][populate][subcategories][populate][oforms][filters][form_exts][ext][$eq]";

type TQuery = NextApiRequest["query"];

// "pt-PT" and "zh-TW" get their language's catalog.
const localeOf = (query: TQuery) => {
  const code = getSingle(query.locale);
  const language = code.split(/[-_]/)[0];
  return (
    LOCALES[code] ?? (Object.values(LOCALES).includes(language) ? language : "")
  );
};

const inLocale = async (locale: string) =>
  (await getCatalog(locale)).filter((form) => form.locale === locale);

const list = (query: TQuery, key: string) => {
  const value = getSingle(query[key]);
  return value ? [value] : [];
};

const toOform = (template: TCatalogItem) => {
  const card = cardUrl(template);
  return {
    id: template.id,
    documentId: String(template.id),
    name_form: template.meta["card-title"],
    updatedAt: template.meta.added,
    description_card: template.meta["card-text"],
    template_desc: template.meta.description,
    url: template.meta.slug,
    card_prewiew: card ? { url: card } : null,
    // Strapi gives the size in KB, and the server matches the file by ext with its dot.
    file_oform: [
      {
        url: fileUrl(template),
        name: fileName(template),
        ext: `.${extOf(template)}`,
        size: template.size / 1024,
      },
    ],
  };
};

const oforms = async (query: TQuery) => {
  const locale = localeOf(query);
  const page = Math.max(1, Number(getSingle(query["pagination[page]"])) || 1);
  const pageSize = Math.max(
    1,
    Number(getSingle(query["pagination[pageSize]"])) || 25,
  );

  let forms: TCatalogItem[] = [];
  const id = Number(getSingle(query["filters[id][$eq]"]));
  if (id) {
    // The server asks with locale=*.
    forms = (await getCatalog("en")).filter((form) => form.id === id);
  } else if (locale) {
    const search = normalizeSearchQuery(getSingle(query[SEARCH]), locale);
    forms = getFilteredForms(await inLocale(locale), {
      type: list(query, EXTENSION),
      purpose: list(query, PURPOSE),
      category: Object.keys(query)
        .filter((key) => key.startsWith(CATEGORY))
        .map((key) => getSingle(query[key])),
    }).filter(
      (form) =>
        !search || form.meta["card-title"].toLowerCase().includes(search),
    );
    forms = sortForms(forms, SORT[getSingle(query["sort[0]"])] ?? "asc");
  }

  return {
    data: forms.slice((page - 1) * pageSize, page * pageSize).map(toOform),
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil(forms.length / pageSize),
        total: forms.length,
      },
    },
  };
};

// Purpose > category > subcategory. Categories have no subcategories now: each gets one
// that carries its count, which is all DocSpace reads from it.
const purposes = async (query: TQuery) => {
  const locale = localeOf(query);
  if (!locale) return { data: [] };

  const forms = getFilteredForms(await inLocale(locale), {
    type: list(query, COUNT_EXTENSION),
  });
  const tree = getCategoriesByPurpose(
    forms,
    (slug) => categoryName(locale, slug),
    collatorFor(locale).compare,
  );

  return {
    data: ["business", "personal"].map((key, index) => ({
      id: index + 1,
      documentId: key,
      key,
      name: purposeName(locale, key),
      parent_categories: (tree[key] ?? []).map(({ name, urlReq, count }) => {
        const category = { id: urlReq, documentId: urlReq, name, urlReq };
        return {
          ...category,
          subcategories: [{ ...category, oforms: { count } }],
        };
      }),
    })),
  };
};

// Desktop (paneltemplates.js, dialogpreview.js) reads only these fields and stops after pageCount.
// Its list shows template_image's thumbnail until card_prewiew loads in the dialog.
// Every request counts, so one page and English for any other language: Strapi's empty answers
// made Desktop walk "ru-RU" → "ru" → "en" page by page, 7 requests a start page.
const desktopOforms = async (query: TQuery) => {
  const forms = sortForms(await inLocale(localeOf(query) || "en"), "asc");
  const data = forms.map((template) => {
    const card = cardUrl(template);
    return {
      id: template.id,
      attributes: {
        name_form: template.meta["card-title"],
        // Shown only in the preview dialog; the long description made the answer 3.6x bigger.
        template_desc: template.meta["card-text"],
        form_exts: { data: [{ attributes: { ext: extOf(template) } }] },
        file_oform: {
          data: [
            {
              attributes: {
                url: fileUrl(template),
                size: template.size / 1024,
              },
            },
          ],
        },
        card_prewiew: card ? { data: { attributes: { url: card } } } : null,
        template_image: card
          ? { data: { attributes: { formats: { thumbnail: { url: card } } } } }
          : null,
      },
    };
  });

  return {
    data,
    meta: {
      pagination: {
        page: 1,
        pageSize: data.length,
        pageCount: 1,
        total: data.length,
      },
    },
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "*");
    return res.status(204).end();
  }
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const path = ([] as string[]).concat(req.query.path ?? []).join("/");
  // As long as Strapi did, never shorter. Only answers: a failed catalog load must not stick.
  const ok = (body: unknown) => {
    res.setHeader("Cache-Control", "public, max-age=259200");
    return res.status(200).json(body);
  };
  try {
    if (path === "v4/oforms") return ok(await desktopOforms(req.query));
    if (path === "oforms") return ok(await oforms(req.query));
    if (path === "purposes") return ok(await purposes(req.query));
    if (path === "i18n/locales") {
      return ok(
        Object.keys(LOCALES).map((code) => ({
          code,
          isDefault: code === "en",
        })),
      );
    }
    return res
      .status(404)
      .json({ data: null, error: { status: 404, name: "NotFoundError" } });
  } catch (error) {
    console.error(
      "[api/strapi]",
      error instanceof Error ? error.message : error,
    );
    return res.status(500).json({
      data: null,
      error: { status: 500, name: "InternalServerError" },
    });
  }
}
