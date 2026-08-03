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
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Heading } from "@src/components/ui/Heading";
import { Link } from "@src/components/ui/Link";
import { SearchIcon, CrossCircleIcon, CrossIcon } from "@src/components/icons";
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

const SearchInput = ({ className, formNames }: ISearchInput) => {
  const { t } = useTranslation("SearchInput");
  const router = useRouter();
  const locale = router.locale ?? "en";
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    if (router.pathname !== "/searchresult") return;

    const { query: queryParam } = router.query;
    const value = Array.isArray(queryParam) ? queryParam[0] : queryParam;

    if (typeof value === "string") {
      setSearchItem(value);
    }
  }, [router.pathname, router.query]);

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
  const searchValue = hasQuery
    ? (formNames ?? [])
        .filter((form) =>
          form.name_form.toLocaleLowerCase().includes(searchName),
        )
        .slice(0, 5)
    : [];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
    if (e.nativeEvent.isTrusted) setSearchResult(true);
  };

  const handleClear = () => {
    setSearchItem("");
    setSearchResult(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const localStorageSearchHistory = readSearchHistory();

    if (localStorageSearchHistory.length > 0) {
      setSearchHistory(localStorageSearchHistory);
    }
  }, []);

  useEffect(() => {
    if (!searchResult) return;

    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
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
      className={clsx(styles["search-input-wrapper"], className)}
    >
      <SearchIcon
        className={styles["search-input-icon"]}
        fill="var(--search-input-icon-color)"
      />
      <input
        ref={inputRef}
        id="search-input"
        className={clsx(styles["search-input"], {
          [styles["search-input-active"]]: searchResult,
          [styles["search-input-with-value"]]: hasQuery,
        })}
        placeholder={t("SearchTemplates")}
        value={searchItem}
        name="search"
        autoComplete="off"
        onChange={handleChange}
        onClick={() => setSearchResult(true)}
        onKeyDown={keyDownHandler}
      />
      {hasQuery && (
        <button
          className={styles["search-input-clear"]}
          onClick={handleClear}
          type="button"
        >
          <CrossIcon fill="var(--search-input-cross-icon-color)" />
        </button>
      )}
      {searchResult &&
        (!hasQuery ? (
          <div className={styles["search-results"]}>
            {searchHistory?.length > 0 && (
              <Heading as="div" className={styles["search-results-label"]}>
                {t("History")}
              </Heading>
            )}
            <ul>
              {searchHistory?.map((item) => (
                <li className={styles["search-results-item"]} key={item}>
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
                  >
                    <CrossCircleIcon fill="var(--search-results-btn-cross-icon-color)" />
                  </button>
                </li>
              ))}
            </ul>
            {popular.length > 0 && (
              <>
                <Heading as="div" className={styles["search-results-label"]}>
                  {t("PopularSearch")}
                </Heading>
                <ul>
                  {popular.map((item, index) => (
                    <li key={index}>
                      <Link
                        className={styles["search-results-link"]}
                        onClick={() => setSearchResult(false)}
                        href={buildSearchHref(item)}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ) : (
          <div className={styles["search-results"]}>
            {searchValue.length > 0 ? (
              <ul>
                {searchValue.map((item) => (
                  <li key={item.id}>
                    <Link
                      className={styles["search-results-link"]}
                      onClick={() => {
                        updateSearchHistory(item.name_form);
                        setSearchResult(false);
                      }}
                      href={item.url}
                    >
                      <Highlight
                        searchQuery={searchItem}
                        text={item.name_form}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
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
