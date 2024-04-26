import StyledAdventAnnounce from "./styled-advent-announce";
import InternalLink from "@common/internal-link";

const AdventAnnounce = ({ t, currentLanguage, stateMobile }) => {
  const href = 
    currentLanguage === "fr" ? "https://www.onlyoffice.com/blog/fr/2024/04/onlyoffice-docspace-2-5-est-disponible" :
    currentLanguage === "de" ? "https://www.onlyoffice.com/blog/de/2024/04/onlyoffice-docspace-2-5-veroeffentlicht" :
    currentLanguage === "es" ? "https://www.onlyoffice.com/blog/es/2024/04/disponible-onlyoffice-docspace-2-5" :
    currentLanguage === "pt" ? "https://www.onlyoffice.com/blog/pt-br/2024/04/onlyoffice-docspace-2-5-lancado" :
    currentLanguage === "it" ? "https://www.onlyoffice.com/blog/it/2024/04/onlyoffice-docspace-2-5" :
    currentLanguage === "ja" ? "https://www.onlyoffice.com/blog/ja/2024/04/onlyoffice-docspace-2-5-released" :
    currentLanguage === "zh" ? "https://www.onlyoffice.com/blog/zh-hans/2024/04/onlyoffice-docspace-2-5-released" :
    "https://www.onlyoffice.com/blog/2024/04/onlyoffice-docspace-2-5-released";

  return (
    <StyledAdventAnnounce className={`${currentLanguage} ${stateMobile ? "active": ""}`}>
      <div className="advent-announce advent-mobile-hide">
        <InternalLink href={href}>
          <div className="advent-announce-text">
            <div dangerouslySetInnerHTML={{ __html: t("AdventAnnounceDesktop")}}></div>
          </div>
        </InternalLink>
      </div>
      <div className={`advent-announce advent-desktop-hide ${stateMobile ? "is-open": ""}`}>
        <InternalLink href={href}>
          <div className="advent-announce-text">
            <div dangerouslySetInnerHTML={{ __html: t("AdventAnnounceMobile")}}></div>
          </div>
        </InternalLink>
      </div>
    </StyledAdventAnnounce>
  )
}

export default AdventAnnounce;