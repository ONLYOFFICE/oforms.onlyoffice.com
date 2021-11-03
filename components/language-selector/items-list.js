import React, { useEffect } from "react";
import {
  StyledItem,
  StyledPanelView,
} from "./styled-language-selector";
import { Link } from "gatsby";
import languages from "../../languages";
export default function LangsList(props) {
  const { t, isOpen, currentLanguage, onCloseSelector } = props;

  useEffect(() => {
    const layout = document.getElementById("page-layout");
    if (isOpen) {
      layout.style.overflow = "hidden";
    }

    if (!isOpen) {
      layout.style.overflow = "unset";
    }
  });

  let path = "";
  if (typeof window !== "undefined") {
    const {
      location: { pathname, search },
    } = window;

    path = `${pathname}${search ? search : ""}`;
  }

  const renderItemList = () => {
    return languages.map((language) => {
      const { shortKey, iconName, key } = language;
      let localizedPath;
      if (currentLanguage === "en") {
        if (path.includes("en")) {
          localizedPath = path.replace(currentLanguage, shortKey);
        } else {
          localizedPath = `/${shortKey}${path}`;
        }
      } else {
        localizedPath = path.replace(currentLanguage, shortKey);
      }

      return (
        <StyledItem key={key}>
          <Link to={`${localizedPath}`} className="language-item-link">
            <img
              src={`/site-assets/flags/${iconName}`}
              alt={key}
              width="18px"
              className="language-item-image"
            />
          </Link>
        </StyledItem>
      );
    });
  };

  const renderPanelView = () => {
    const itemsList = renderItemList();
    return (
      <StyledPanelView
        isOpen={isOpen}
        countLanguages={languages.length}
        className="lng-selector"
      >
        {itemsList}
      </StyledPanelView>
    );
  };

  const panelView = renderPanelView();

  return panelView;
}