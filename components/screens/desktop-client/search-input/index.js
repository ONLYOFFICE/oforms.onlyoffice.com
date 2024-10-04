import StyledSearchInput from "./styled-search-input";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const SearchInput = ({ t, setHideCategorySelector, theme }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showCrossBtn, setShowCrossBtn] = useState(false);
  const inputRef = useRef(null);

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

      window.addEventListener("resize", resizeHandler);
    }

    return () => {
      if (router.pathname === "/searchresult") {
        window.removeEventListener("resize", resizeHandler);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (router.pathname === "/searchresult") {
        if (window.innerWidth < 592) {
          if (isOpen && !event.target.closest(".search")) {
            setShowCrossBtn(false);
            setIsOpen(false);
            setHideCategorySelector(false);
          }
        }
      } else {
        if (isOpen && !event.target.closest(".search")) {
          setShowCrossBtn(false);
          setIsOpen(false);
          setHideCategorySelector(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

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
    inputRef.current.focus();
    setHideCategorySelector(true);
    handleCheckInputValue();
  };

  return (
    <StyledSearchInput theme={theme} className={`search ${isOpen ? "open" : ""}`}>
      <button onClick={handleShowSearch} className="search-input-btn search-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M15.5 10C15.5 13.0376 13.0376 15.5 10 15.5C6.96243 15.5 4.5 13.0376 4.5 10C4.5 6.96243 6.96243 4.5 10 4.5C13.0376 4.5 15.5 6.96243 15.5 10ZM14.2315 15.5767C13.0563 16.4699 11.59 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 11.7354 16.3685 13.3234 15.3227 14.5465L20.1172 19.341L19.0565 20.4017L14.2315 15.5767Z" fill="black" fillOpacity="0.8"/>
        </svg>
      </button>
      <input
        ref={inputRef}
        onClick={handleCheckInputValue}
        onChange={handleSearchInput}
        onKeyDown={(e) => onKeyDownHandle(e)}
        className={`search-input ${router.pathname === "/searchresult" ? "searchresult" : ""}`}
        placeholder={t("Search")}
        value={inputValue}
      />
      <button onClick={handleClearValue} className={`search-input-btn cross-btn ${showCrossBtn ? "show" : ""}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8L15 15M15 8L8 15" stroke="black" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </StyledSearchInput>
  );
};

export default SearchInput;
