import StyledSearchInput from "./styled-search-input";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";

const SearchInput = ({ t, setHideCategorySelector, theme }) => {
  const router = useRouter();
  const selectorRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showCrossBtn, setShowCrossBtn] = useState(false);

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth >= 592) {
        setIsOpen(true);
        setHideCategorySelector(true);
        setShowCrossBtn(true);
      } else {
        setIsOpen(false);
        setHideCategorySelector(false);
        setShowCrossBtn(false);
      }
    };

    if (router.pathname === "/searchresult") {
      resizeHandler();

      if (router.query.query) {
        setInputValue(router.query.query);
      }
    }

    const handleClickOutside = (event) => {
      if (router.pathname === "/searchresult") {
        if (window.innerWidth < 592) {
          if (selectorRef.current && !selectorRef.current.contains(event.target)) {
            setShowCrossBtn(false);
            setIsOpen(false);
            setHideCategorySelector(false);
          }
        }
      } else {
        if (selectorRef.current && !selectorRef.current.contains(event.target)) {
          setShowCrossBtn(false);
          setIsOpen(false);
          setHideCategorySelector(false);
        }
      }
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const handleSearchInput = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);

    if (e.target.value.length > 0 ) {
      setShowCrossBtn(true);
    } else {
      setShowCrossBtn(false);
    }
  };

  const onKeyDownHandle = (e) => {
    if (e.key === "Enter") {
      router.push({
        pathname: "/searchresult",
        query: { ...router.query, query: inputValue }
      });
    }
  };

  const handleClearValue = () => {
    setInputValue("");
    setShowCrossBtn(false);

    if (router.pathname === "/searchresult") {
      router.push({
        pathname: "/",
        query: Object.fromEntries(Object.entries(router.query).filter(([key, value]) => key !== "query"))
      });

      if (window.innerWidth < 592) {
        setIsOpen(false);
        setHideCategorySelector(false);
      } else {
        setIsOpen(true);
        setHideCategorySelector(true);
      }
    } else {
      setIsOpen(false);
      setHideCategorySelector(false);
    }
  };

  const handleCheckInputValue = () => {
    if (inputValue.length > 0) {
      setShowCrossBtn(true);
    } else {
      setShowCrossBtn(false);
    }
  };

  const handleShowSearch = () => {
    setIsOpen(true);
    setHideCategorySelector(true);
    handleCheckInputValue();
  };

  return (
    <StyledSearchInput ref={selectorRef} theme={theme} className={`search ${isOpen ? "open" : ""}`}>
      <button onClick={handleShowSearch} className="search-input-btn search-btn">
        <ReactSVG src="/icons/search.svg" />
      </button>
      <input
        onClick={handleCheckInputValue}
        onChange={handleSearchInput}
        onKeyDown={(e) => onKeyDownHandle(e)}
        className={`search-input ${router.pathname === "/searchresult" ? "searchresult" : ""}`}
        placeholder={t("Search")}
        value={inputValue}
      />
      <button onClick={handleClearValue} className={`search-input-btn cross-btn ${showCrossBtn ? "show" : ""}`}>
        <ReactSVG src="/icons/cross-small.svg" />
      </button>
    </StyledSearchInput>
  );
};

export default SearchInput;
