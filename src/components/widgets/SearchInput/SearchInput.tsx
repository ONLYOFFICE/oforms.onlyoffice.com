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
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import debounce from "lodash.debounce";
import { getSearchResultInput } from "@src/lib/requests/getSearchResultInput";
import { Heading } from "@src/components/ui/Heading";
import { Link } from "@src/components/ui/Link";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { POPULAR_SEARCH } from "./data/popular-search";
import { TSearchResult } from "./SearchInput.types";
import styles from "./SearchInput.module.scss";

const Highlight = ({
  searchQuery,
  text,
}: {
  searchQuery: string;
  text: string;
}) => {
  if (!searchQuery) return <>{text}</>;

  const regexp = new RegExp(`(${searchQuery})`, "ig");
  return (
    <>
      {text.split(regexp).map((part, index) =>
        regexp.test(part) ? (
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

const SearchInput = () => {
  const { t } = useTranslation("SearchInput");
  const router = useRouter();
  const locale = router.locale ?? "en";
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<TSearchResult | []>([]);

  const updateSearchValue = useMemo(
    () =>
      debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
          const searchData = await getSearchResultInput(locale, e.target.value);
          setSearchValue(searchData);
        } else {
          setSearchValue([]);
        }
      }, 500),
    [locale],
  );

  const HighlightText = useCallback(
    (text: string) => <Highlight searchQuery={searchItem} text={text} />,
    [searchItem],
  );

  useEffect(() => {
    return () => {
      updateSearchValue.cancel();
    };
  }, [updateSearchValue]);

  useEffect(() => {
    const localStorageSearchHistory = JSON.parse(
      localStorage.getItem("search_history") ?? "null",
    );

    if (localStorageSearchHistory?.length > 0) {
      setSearchHistory(localStorageSearchHistory);
    }

    if (router.pathname === "/searchresult") {
      const query = router.query.query;
      setSearchItem(typeof query === "string" ? query : "");
    }
  }, [router.pathname, router.query.query]);

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

  const handleRemoveSearchHistoryItem = (
    e: MouseEvent<HTMLButtonElement>,
    indexToRemove: number,
  ) => {
    e.stopPropagation();
    const updatedSearchHistory = searchHistory.filter(
      (_, index) => index !== indexToRemove,
    );
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem(
      "search_history",
      JSON.stringify(updatedSearchHistory),
    );
  };

  const updateSearchHistory = (value: string) => {
    const filteredQuery = value.trim();

    if (filteredQuery && !searchHistory?.includes(filteredQuery)) {
      const newSearchHistory = [filteredQuery, ...searchHistory.slice(0, 4)];
      newSearchHistory.sort((a, b) => a.localeCompare(b));
      setSearchHistory(newSearchHistory);
      localStorage.setItem("search_history", JSON.stringify(newSearchHistory));
    }
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateSearchHistory(searchItem);
      setSearchResult(false);
      router.push(`/searchresult?query=${searchItem}`);
    }
  };

  const popular =
    POPULAR_SEARCH[locale as keyof typeof POPULAR_SEARCH] ?? POPULAR_SEARCH.en;

  const resultData = Array.isArray(searchValue) ? undefined : searchValue.data;
  const hasQuery = !Array.isArray(searchValue);

  return (
    <div
      ref={searchRef}
      className={styles["search-input-wrapper"]}
      style={
        {
          "--search-input-wrapper-background-image": `url(${getAssetUrl("/images/widgets/search-input/search.svg")})`,
        } as React.CSSProperties
      }
    >
      <input
        className={styles["search-input"]}
        placeholder={t("SearchTemplates")}
        value={searchItem}
        onChange={(e) => {
          setSearchItem(e.target.value);
          updateSearchValue(e);
        }}
        onClick={() => setSearchResult(true)}
        onKeyDown={keyDownHandler}
      />
      {searchResult &&
        (!hasQuery ? (
          <div className={styles["search-results"]}>
            {searchHistory?.length > 0 && (
              <Heading
                as="div"
                size={6}
                className={styles["search-results-label"]}
              >
                {t("History")}
              </Heading>
            )}
            {searchHistory?.map((item, index) => (
              <div
                className={styles["search-results-item"]}
                onClick={() => setSearchResult(false)}
                key={item}
              >
                <Link href={`/searchresult?query=${item}`}>{item}</Link>
                <button
                  className={styles["search-results-btn"]}
                  onClick={(e) => handleRemoveSearchHistoryItem(e, index)}
                  type="button"
                >
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.4">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.31348 12C3.31348 7.0275 7.34098 3 12.3135 3C17.286 3 21.3135 7.0275 21.3135 12C21.3135 16.9725 17.286 21 12.3135 21C7.34098 21 3.31348 16.9725 3.31348 12ZM8.77772 9.87868C8.3872 9.48816 8.3872 8.85499 8.77772 8.46447C9.16825 8.07394 9.80141 8.07394 10.1919 8.46447L12.3133 10.5858L14.4346 8.46447C14.8251 8.07394 15.4583 8.07394 15.8488 8.46447C16.2393 8.85499 16.2393 9.48816 15.8488 9.87868L13.7275 12L15.8488 14.1213C16.2393 14.5118 16.2393 15.145 15.8488 15.5355C15.4583 15.9261 14.8251 15.9261 14.4346 15.5355L12.3133 13.4142L10.1919 15.5355C9.80141 15.9261 9.16825 15.9261 8.77772 15.5355C8.3872 15.145 8.3872 14.5118 8.77772 14.1213L10.899 12L8.77772 9.87868Z"
                        fill="#444444"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            ))}
            {popular.length > 0 && (
              <>
                <Heading
                  as="div"
                  size={6}
                  className={styles["search-results-label"]}
                >
                  {t("PopularSearch")}
                </Heading>
                {popular.map((item) => (
                  <Link
                    className={styles["search-results-popular-item"]}
                    onClick={() => setSearchResult(false)}
                    href={`/searchresult?query=${item}`}
                    key={item}
                  >
                    {item}
                  </Link>
                ))}
              </>
            )}
          </div>
        ) : (
          <div className={styles["search-results"]}>
            {resultData && resultData.length > 0 ? (
              resultData.map((item) => (
                <Link
                  className={styles["search-results-popular-item"]}
                  onClick={() => updateSearchHistory(item.attributes.name_form)}
                  href={item.attributes.url}
                  key={item.id}
                >
                  {HighlightText(item.attributes.name_form)}
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
