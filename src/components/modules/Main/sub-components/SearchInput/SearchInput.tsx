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

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Heading } from "@src/components/ui/Heading";
import { Link } from "@src/components/ui/Link";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { POPULAR_SEARCH } from "./data/popular-search";
import { ISearchInput } from "./SearchInput.types";
import styles from "./SearchInput.module.scss";

const SEARCH_HISTORY_KEY = "search_history";
const SEARCH_HISTORY_LIMIT = 5;

const readSearchHistory = (): string[] => {
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed)
      ? parsed
          .filter((item): item is string => typeof item === "string")
          .slice(0, SEARCH_HISTORY_LIMIT)
      : [];
  } catch {
    return [];
  }
};

const writeSearchHistory = (history: string[]) => {
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  } catch {}
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const Highlight = ({
  searchQuery,
  text,
}: {
  searchQuery: string;
  text: string;
}) => {
  const query = searchQuery.trim();
  if (!query) return <>{text}</>;

  const regexp = new RegExp(`(${escapeRegExp(query)})`, "gi");

  return (
    <>
      {text.split(regexp).map((part, index) =>
        part?.toLocaleLowerCase() === query.toLocaleLowerCase() ? (
          <span key={index} className={styles["search-excerpt"]}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
};

const SearchInput = ({ formNames }: ISearchInput) => {
  const { t } = useTranslation("SearchInput");
  const router = useRouter();
  const locale = router.locale ?? "en";
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const query = searchItem.trim().toLocaleLowerCase();
  const hasQuery = query.length > 0;
  const searchName =
    locale === "en" || locale === "fr" || locale === "pt"
      ? query === "curriculum vitae" ||
        query === "curriculum" ||
        query === "vitae"
        ? "cv"
        : query
      : query;
  const searchValue = useMemo(
    () =>
      hasQuery
        ? (formNames ?? [])
            .filter((form) =>
              form.name_form.toLocaleLowerCase().includes(searchName),
            )
            .slice(0, 5)
        : [],
    [formNames, searchName, hasQuery],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
    setSearchResult(true);
  };

  useEffect(() => {
    const localStorageSearchHistory = readSearchHistory();

    if (localStorageSearchHistory.length > 0) {
      setSearchHistory(localStorageSearchHistory);
    }
  }, []);

  useEffect(() => {
    if (!searchResult) return;

    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchResult(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchResult]);

  const persistSearchHistory = (history: string[]) => {
    setSearchHistory(history);
    writeSearchHistory(history);
  };

  const handleRemoveSearchHistoryItem = (
    e: MouseEvent<HTMLButtonElement>,
    valueToRemove: string,
  ) => {
    e.stopPropagation();
    const normalized = valueToRemove.toLocaleLowerCase();
    const updatedSearchHistory = readSearchHistory().filter(
      (item) => item.toLocaleLowerCase() !== normalized,
    );
    persistSearchHistory(updatedSearchHistory);
  };

  const updateSearchHistory = (value: string) => {
    const filteredQuery = value.trim();
    if (!filteredQuery) return;

    const normalized = filteredQuery.toLocaleLowerCase();
    const current = readSearchHistory().filter(
      (item) => item.toLocaleLowerCase() !== normalized,
    );

    const newSearchHistory = [filteredQuery, ...current].slice(
      0,
      SEARCH_HISTORY_LIMIT,
    );
    persistSearchHistory(newSearchHistory);
  };

  const buildSearchHref = (value: string) =>
    `/searchresult?query=${encodeURIComponent(value)}`;

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!searchItem.trim()) return;
      updateSearchHistory(searchItem);
      setSearchResult(false);
      router.push(buildSearchHref(searchItem));
    }
  };

  const popular =
    POPULAR_SEARCH[locale as keyof typeof POPULAR_SEARCH] ?? POPULAR_SEARCH.en;

  return (
    <div
      ref={searchRef}
      className={styles["search-input-wrapper"]}
      style={
        {
          "--search-input-wrapper-background-image": `url(${getAssetUrl("/images/templates/main/search-input/search.svg")})`,
        } as React.CSSProperties
      }
    >
      <input
        id="search-input"
        className={styles["search-input"]}
        placeholder={t("SearchTemplates")}
        value={searchItem}
        name="search"
        autoComplete="off"
        onChange={handleChange}
        onClick={() => setSearchResult(true)}
        onKeyDown={keyDownHandler}
      />
      {searchResult &&
        (!hasQuery ? (
          <div className={styles["search-results"]}>
            {searchHistory?.length > 0 && (
              <Heading as="div" className={styles["search-results-label"]}>
                {t("History")}
              </Heading>
            )}
            {searchHistory?.map((item) => (
              <div className={styles["search-results-item"]} key={item}>
                <Link
                  href={buildSearchHref(item)}
                  onClick={() => setSearchResult(false)}
                >
                  {item}
                </Link>
                <button
                  className={styles["search-results-btn"]}
                  onClick={(e) => handleRemoveSearchHistoryItem(e, item)}
                  type="button"
                  style={
                    {
                      "--search-results-btn-icon": `url(${getAssetUrl("/images/templates/main/search-input/cross.svg")})`,
                    } as React.CSSProperties
                  }
                ></button>
              </div>
            ))}
            {popular.length > 0 && (
              <>
                <Heading as="div" className={styles["search-results-label"]}>
                  {t("PopularSearch")}
                </Heading>
                {popular.map((item, index) => (
                  <Link
                    className={styles["search-results-popular-item"]}
                    onClick={() => setSearchResult(false)}
                    href={buildSearchHref(item)}
                    key={index}
                  >
                    {item}
                  </Link>
                ))}
              </>
            )}
          </div>
        ) : (
          <div className={styles["search-results"]}>
            {searchValue.length > 0 ? (
              searchValue.map((item) => (
                <Link
                  className={styles["search-results-popular-item"]}
                  onClick={() => {
                    updateSearchHistory(item.name_form);
                    setSearchResult(false);
                  }}
                  href={item.url}
                  key={item.id}
                >
                  <Highlight searchQuery={searchItem} text={item.name_form} />
                </Link>
              ))
            ) : (
              <div className={styles["search-results-no-results"]}>
                {t("NoMoreResults")}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export { SearchInput };
