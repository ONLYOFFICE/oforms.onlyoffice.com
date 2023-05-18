import { useRouter } from "next/router";
import Link from "next/link";
import languages from "@config/languages.json";

import { StyledItem, StyledPanelView } from "./styled-language-selector";
import {useMemo} from "react";

export default function LangsList({ isOpen }) {
  const router = useRouter();
  const theme = router.query.theme
  const isDesktop = router.query.desktop !== undefined;
  const appTheme = useMemo(() => {
    if(theme && isDesktop) return theme
  }, [theme, isDesktop])
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  const renderItemList = () => {
    return languages.map((language) => {
      return (
        <StyledItem key={language.key}>
          <Link href={isDesktop ? `/?desktop=true${appTheme !== undefined ? `&theme=${theme}` : ''}` : "/"} locale={language.shortKey} onClick={handleClick}>
            <a className="language-item-link">
              <img
                src={`https://static-oforms.onlyoffice.com/images/flags/${language.iconName}`}
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
