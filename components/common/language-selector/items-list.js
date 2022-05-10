import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import languages from "@config/languages.json";

import { StyledItem, StyledPanelView } from "./styled-language-selector";

export default function LangsList({ isOpen }) {
  const router = useRouter();

  useEffect(() => {
    const layout = document.getElementById("page-layout");
    if (isOpen) {
      layout.style.overflow = "hidden";
    }

    if (!isOpen) {
      layout.style.overflow = "unset";
    }
  });

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  const renderItemList = () => {
    return languages.map((language) => {
      return (
        <StyledItem key={language.key}>
          <Link href={"/"} locale={language.shortKey} onClick={handleClick}>
            <a className="language-item-link">
              <img
                src={`/images/flags/${language.iconName}`}
                alt={language.key}
                width="18px"
                className="language-item-image"
              />
            </a>
          </Link>
        </StyledItem>
      );
    });
  };

  const renderPanelView = () => {
    const itemsList = renderItemList();
    return (
      <StyledPanelView isOpen={isOpen} className="lng-selector">
        {itemsList}
      </StyledPanelView>
    );
  };

  const panelView = renderPanelView();

  return panelView;
}
