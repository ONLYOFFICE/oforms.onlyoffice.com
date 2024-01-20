import StyledAdventAnnounce from "./styled-advent-announce";

const AdventAnnounce = ({ t, currentLanguage, stateMobile }) => {
  const href = 
    currentLanguage === "fr" ? "https://www.onlyoffice.com/blog/fr/2023/12/onlyoffice-docspace-2-0" :
    currentLanguage === "de" ? "https://www.onlyoffice.com/blog/de/2023/12/onlyoffice-docspace-2-0-veroeffentlicht" :
    currentLanguage === "es" ? "https://www.onlyoffice.com/blog/es/2023/12/disponible-onlyoffice-docspace-2-0" :
    currentLanguage === "pt" ? "https://www.onlyoffice.com/blog/pt-br/2023/12/onlyoffice-docspace-2-0-disponivel" :
    currentLanguage === "it" ? "https://www.onlyoffice.com/blog/it/2023/12/onlyoffice-docspace-2-0" :
    "https://www.onlyoffice.com/blog/2023/12/onlyoffice-docspace-2-0-released";

  return (
    <StyledAdventAnnounce className={`${currentLanguage} ${stateMobile ? "active": ""}`}>
      <div className="advent-announce advent-mobile-hide">
        <a href={href} target="_blank" rel="noreferrer noopener">
          <div className="advent-announce-text">
            <span dangerouslySetInnerHTML={{ __html: t("AdventAnnounceDesktop")}} />
          </div>
        </a>
      </div>
      <div className={`advent-announce advent-desktop-hide ${stateMobile ? "is-open": ""}`}>
        <a href={href} target="_blank" rel="noreferrer noopener">
          <div className="advent-announce-text">
            <span dangerouslySetInnerHTML={{ __html: t("AdventAnnounceMobile")}} />
          </div>
        </a>
      </div>
    </StyledAdventAnnounce>
  )
}

export default AdventAnnounce;