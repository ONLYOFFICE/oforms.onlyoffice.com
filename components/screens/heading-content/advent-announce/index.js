import { useState, useEffect } from "react";
import StyledAdventAnnounce from "./styled-advent-announce";

const AdventAnnounce = ({t, currentLanguage}) => {
  const [link, setLink] = useState('');
  const hrefLang = `https://onlyoffice.com/blog/${currentLanguage === "zh" ? "zh-hans" : `${currentLanguage}`
  }`;

  const setBlogLink = () => {
    if(currentLanguage === "en" || currentLanguage === "zh" || currentLanguage === "ja") {
      return (
        setLink("/2023/03/onlyoffice-workspace-12-5-released/")
      );
    } else if (currentLanguage === "fr" || currentLanguage === "es" || currentLanguage === "it"){
      return (
        setLink ("/2023/03/onlyoffice-workspace-12-5/")
      );
    } else {
      return (
        setLink("2023/03/onlyoffice-workspace-12-5-verbesserte-sicherheit-optimierte-dokumentenverwaltung-dunkelmodus-und-mehr/")
      );
    }
  };

  useEffect(() => {
    setBlogLink();
  }, []);
 

  return (
    <StyledAdventAnnounce  currentLanguage={currentLanguage}>
      <div className="advent-announce advent-mobile-hide">        

        <a href={`${hrefLang}/${link}`} target="_blank" rel="noreferrer noopener">
          <div className="advent-announce-text">
            <b>{t("ONLYOFFICE Workspace 12.5:")}</b>{t(" enhanced security, optimized document management, Dark theme, and more")} 
          </div>
        </a>
      </div>
      <div className="advent-announce advent-desktop-hide">

        <a href={`${hrefLang}${link}`} target="_blank" rel="noreferrer noopener">
          <div className="advent-announce-text">
            &nbsp;<b>{t("ONLYOFFICE Workspace 12.5 released")}</b>&nbsp;
          </div>
        </a>
      </div>
    </StyledAdventAnnounce>
  )
}

export default AdventAnnounce;