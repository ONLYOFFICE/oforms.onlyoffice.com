import React, { useEffect } from "react";
import { StyledItem, StyledPanelView } from "./styled-language-selector";
import { Link } from "gatsby";
import languages from "../../languages.json";
export default function LangsList(props) {
  const { isOpen, currentLanguage } = props;

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
      let tmpshortKey = shortKey === "en" ? "" : `/${shortKey}`;
      let templatePagesKey = shortKey === "en" ? "" : `${shortKey}`;
      let templatePath = shortKey === "en" ? path.slice(1) : path;

      if (currentLanguage === "en") {
        if (path === "/") {
          localizedPath = `${tmpshortKey}${path}`;
        } else {
          localizedPath = `${tmpshortKey}${path}`;
        }
      } else {
        localizedPath = templatePath.replace(currentLanguage, templatePagesKey);
      }

      return (
        <StyledItem key={key}>
          <Link to={`${localizedPath}`} className="language-item-link">
            <img
              src={`/images/flags/${iconName}`}
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
