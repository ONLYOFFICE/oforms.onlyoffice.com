import type { NextApiRequest, NextApiResponse } from "next";

import { getExtForms } from "@src/lib/requests/getExtForms";
import { getSubCategoryForms } from "@src/lib/requests/getSubCategoryForms";
import { getTypeWithSubCategoryForms } from "@src/lib/requests/getTypeWithSubCategoryForms";
import { ILocale } from "@src/types/locale";
import { parseListQuery } from "@src/utils/parseListQuery";
import { TSortKey } from "@src/utils/sortMap";

const ALLOWED_EXTS = ["docx", "xlsx", "pptx", "pdf"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    locale,
    sort,
    page,
    pageSize,
    type,
    categories,
    types,
    compilations,
  } = req.body as {
    locale?: ILocale["locale"];
    sort?: TSortKey;
    page?: string;
    pageSize?: string;
    type?: string;
    categories?: string;
    types?: string;
    compilations?: string;
  };

  const parsedPage = Number(page) > 0 ? Number(page) : 1;
  const parsedPageSize = Number(pageSize) > 0 ? Number(pageSize) : 8;
  const sortQuery: TSortKey = sort ?? "asc";
  const localeQuery = locale as ILocale["locale"];

  const categoriesQuery = parseListQuery(categories);
  const typesQuery = parseListQuery(types);
  const compilationsQuery = parseListQuery(compilations);

  try {
    if (categoriesQuery || typesQuery || compilationsQuery) {
      const typeQuery = parseListQuery(type, ALLOWED_EXTS);
      const data = typeQuery
        ? await getTypeWithSubCategoryForms(
            localeQuery,
            categoriesQuery
              ? "categories"
              : typesQuery
                ? "types"
                : "compilations",
            typeQuery,
            (categoriesQuery ?? typesQuery ?? compilationsQuery)![0],
            sortQuery,
            parsedPageSize,
            parsedPage,
          )
        : await getSubCategoryForms(
            localeQuery,
            categoriesQuery
              ? "categories"
              : typesQuery
                ? "types"
                : "compilations",
            (categoriesQuery ?? typesQuery ?? compilationsQuery)![0],
            sortQuery,
            parsedPageSize,
            parsedPage,
          );
      return res.status(200).json(data);
    }

    if (!type || !ALLOWED_EXTS.includes(type)) {
      return res.status(400).json({ error: "Invalid ext" });
    }

    const data = await getExtForms(
      localeQuery,
      type,
      sortQuery,
      parsedPageSize,
      parsedPage,
    );
    return res.status(200).json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: message });
  }
}
