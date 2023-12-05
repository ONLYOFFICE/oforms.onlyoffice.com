import StyledAdventAnnounce from "./styled-advent-announce";

const AdventAnnounce = ({ t, currentLanguage, stateMobile }) => {
  const href = 
    currentLanguage === "fr" ? "https://www.onlyoffice.com/blog/fr/2023/10/sortie-onlyoffice-docs-7-5" :
    currentLanguage === "de" ? "https://www.onlyoffice.com/blog/de/2023/10/onlyoffice-docs-7-5-veroeffentlicht" :
    currentLanguage === "es" ? "https://www.onlyoffice.com/blog/es/2023/10/disponible-onlyoffice-docs-7-5" :
    currentLanguage === "pt-br" ? "https://www.onlyoffice.com/blog/pt-br/2023/10/onlyoffice-docs-7-5-lancado" :
    currentLanguage === "it" ? "https://www.onlyoffice.com/blog/it/2023/10/onlyoffice-docs-7-5" :
    currentLanguage === "ja" ? "https://www.onlyoffice.com/blog/ja/2023/10/onlyoffice-docs-7-5-released" :
    currentLanguage === "zh" ? "https://www.onlyoffice.com/blog/zh-hans/2023/10/onlyoffice-docs-7-5-released" : 
    "https://www.onlyoffice.com/blog/2023/10/onlyoffice-docs-7-5-released";

  return (
    <StyledAdventAnnounce className={`${currentLanguage} ${stateMobile ? "active": ""}`}>
      <div className="advent-announce advent-mobile-hide">
        <a href={href} target="_blank" rel="noreferrer noopener">
          <div className="advent-announce-text">
            <b>{t("ONLYOFFICE Docs v7.5 released")}{`${currentLanguage === "zh" ? "：" : currentLanguage === "ja" ? "： " : ": "}`}</b>{t("PDF Editor, automatic hyphenation, Page Breaks and tracer arrows in sheets, Screen Readers, and more")}
          </div>
        </a>
      </div>
      <div className={`advent-announce advent-desktop-hide ${stateMobile ? "is-open": ""}`}>
        <a href={href} target="_blank" rel="noreferrer noopener">
          <div className="advent-announce-text">
            <b>{t("ONLYOFFICE Docs v7.5 released")}</b>
          </div>
        </a>
      </div>
    </StyledAdventAnnounce>
  )
}

export default AdventAnnounce;