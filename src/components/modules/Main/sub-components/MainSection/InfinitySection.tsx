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

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { Heading } from "@src/components/ui/Heading";
import { Link } from "@src/components/ui/Link";
import { Card } from "@src/components/widgets/Card";
import { appendOpenedParam } from "@src/utils/appendOpenedParam";
import { IInfinitySection, TSubCategoryRelations } from "./MainSection.types";
import styles from "./MainSection.module.scss";

const SUBCATEGORY_HREF_PREFIX: Record<
  NonNullable<IInfinitySection["subCategory"]>["relation"],
  string
> = {
  categories: "/form/",
  types: "/form/types/",
  compilations: "/form/compilations/",
};

const SUBCATEGORY_LABEL_FIELD: Record<
  NonNullable<IInfinitySection["subCategory"]>["relation"],
  "categorie" | "type" | "compilation"
> = {
  categories: "categorie",
  types: "type",
  compilations: "compilation",
};

const InfinitySection = ({
  label,
  href,
  data,
  ext,
  subCategory,
  loadOnClient = false,
  headingWithoutLink,
}: IInfinitySection) => {
  const getSubCategoryAttributes = (
    items: IInfinitySection["data"]["data"],
  ) => {
    if (!subCategory) return undefined;
    const relations = items?.[0]?.attributes as unknown as
      | TSubCategoryRelations
      | undefined;
    return relations?.[subCategory.relation]?.data?.[0]?.attributes;
  };

  const deriveSubCategoryHref = (items: IInfinitySection["data"]["data"]) => {
    const urlReq = getSubCategoryAttributes(items)?.urlReq;
    return subCategory && urlReq
      ? `${SUBCATEGORY_HREF_PREFIX[subCategory.relation]}${urlReq}`
      : undefined;
  };

  const deriveSubCategoryLabel = (items: IInfinitySection["data"]["data"]) =>
    subCategory &&
    getSubCategoryAttributes(items)?.[
      SUBCATEGORY_LABEL_FIELD[subCategory.relation]
    ];

  const [items, setItems] = useState(data?.data || []);
  const [subCategoryHref, setSubCategoryHref] = useState(() =>
    deriveSubCategoryHref(data?.data || []),
  );
  const [subCategoryLabel, setSubCategoryLabel] = useState(() =>
    deriveSubCategoryLabel(data?.data || []),
  );
  const [page, setPage] = useState(loadOnClient ? 0 : 1);
  const [actualTotal, setActualTotal] = useState(
    loadOnClient ? undefined : data?.meta.pagination.total,
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const hasMore = actualTotal === undefined || items.length < actualTotal;
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const requestIdRef = useRef(0);
  const sortKey = Array.isArray(router.query._sort)
    ? router.query._sort[0]
    : router.query._sort;

  useEffect(() => {
    requestIdRef.current += 1;
    setItems(data?.data || []);
    setSubCategoryHref(deriveSubCategoryHref(data?.data || []));
    setSubCategoryLabel(deriveSubCategoryLabel(data?.data || []));
    setPage(loadOnClient ? 0 : 1);
    setActualTotal(loadOnClient ? undefined : data?.meta.pagination.total);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortKey]);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const requestId = requestIdRef.current;
    try {
      const nextPage = page + 1;

      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: nextPage,
          pageSize: 8,
          ...(router.locale && { locale: router.locale }),
          ...(router.query._sort && {
            sort: router.query._sort,
          }),
          ...((ext ?? router.query.type) && {
            type: ext ?? router.query.type,
          }),
          ...(subCategory
            ? { [subCategory.relation]: subCategory.id }
            : {
                ...(router.query.types && {
                  types: router.query.types,
                }),
                ...(router.query.categories && {
                  categories: router.query.categories,
                }),
                ...(router.query.compilations && {
                  compilations: router.query.compilations,
                }),
              }),
        }),
      });
      const data = await res.json();

      if (requestId !== requestIdRef.current) return;

      const newItems = data?.data || [];

      setActualTotal(data?.meta?.pagination?.total);
      setItems((prev) => [...prev, ...newItems]);
      if (subCategory && !subCategoryHref) {
        setSubCategoryHref(deriveSubCategoryHref(newItems));
      }
      if (subCategory && !subCategoryLabel) {
        setSubCategoryLabel(deriveSubCategoryLabel(newItems));
      }
      setPage(nextPage);
    } catch (error) {
      console.error("[InfiniteFormSection]", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, isLoading, page]);

  if (loadOnClient && actualTotal === 0 && items.length === 0) {
    return null;
  }

  return (
    <div className={styles["main-section"]}>
      {headingWithoutLink ? (
        <div className={styles["main-section-heading-link"]}>
          <Heading level={2} size={3}>
            {label || subCategoryLabel}
          </Heading>
        </div>
      ) : (
        <Link
          href={appendOpenedParam(
            subCategory ? subCategoryHref : href,
            router.query.opened,
          )}
          className={styles["main-section-heading-link"]}
        >
          <Heading level={2} size={3}>
            {label || subCategoryLabel}
          </Heading>
        </Link>
      )}

      <div className={styles["main-section-cards"]}>
        {items?.map((item) => (
          <Card
            key={item.id}
            className={styles["main-section-card"]}
            preview={item.attributes.card_prewiew?.data.attributes.url}
            format={item.attributes.form_exts?.data[0].attributes.ext}
            heading={item.attributes.name_form}
            description={item.attributes.description_card}
            url={item.attributes.url}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className={styles["main-section-sentinel"]}>
          {isLoading && <span className={styles["main-section-loader"]} />}
        </div>
      )}
    </div>
  );
};

export { InfinitySection };
