import { useState, useEffect } from "react";
import StyledAdventAnnounce from "./styled-advent-announce";
import {useTranslation} from "next-i18next";

const AdventAnnounce = ({currentLanguage}) => {
  const [link, setLink] = useState('');
  const hrefLang = `https://onlyoffice.com/blog/${currentLanguage === "zh" ? "zh-hans" : `${currentLanguage}`
  }`;
  const { t } = useTranslation('common')

  const setBlogLink = () => {
    setLink(`2023/04/meet-onlyoffice-docspace/`)
  };

  useEffect(() => {
    setBlogLink();
  }, []);
 

  return (
    <StyledAdventAnnounce  currentLanguage={currentLanguage}>
      <div className="advent-announce advent-mobile-hide">        

        <a href={`${hrefLang}/${link}`} target="_blank" rel="noreferrer noopener">
          <div className="advent-announce-text">
            <b>{t("ONLYOFFICE DocSpace released")}:</b>{t(" improve document collaboration with offices, customers, and partners.")}
            <b>{t(" Use it for free!")}</b>
          </div>
        </a>
      </div>
      <div className="advent-announce advent-desktop-hide">

        <a href={`${hrefLang}${link}`} target="_blank" rel="noreferrer noopener">
          <div className="advent-announce-text">
            &nbsp;<b>{t("ONLYOFFICE DocSpace released")}</b>&nbsp;
          </div>
        </a>
      </div>
    </StyledAdventAnnounce>
  )
}

export default AdventAnnounce;