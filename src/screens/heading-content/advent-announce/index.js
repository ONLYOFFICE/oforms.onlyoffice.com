import StyledAdventAnnounce from "./styled-advent-announce";
import InternalLink from "@common/internal-link";

const AdventAnnounce = ({ t, currentLanguage, stateMobile }) => {
  const href = 
    currentLanguage === "fr" ? "https://www.onlyoffice.com/blog/fr/2024/02/application-onlyoffice-docspace-pour-zoom" :
    currentLanguage === "de" ? "https://www.onlyoffice.com/blog/de/2024/02/onlyoffice-docspace-app-fuer-zoom-arbeiten-sie-in-videokonferenzen-an-dokumenten-zusammen" :
    currentLanguage === "es" ? "https://www.onlyoffice.com/blog/es/2024/02/app-onlyoffice-docspace-para-zoom" :
    currentLanguage === "pt" ? "https://www.onlyoffice.com/blog/pt-br/2024/02/aplicativo-onlyoffice-docspace-para-zoom" :
    currentLanguage === "it" ? "https://www.onlyoffice.com/blog/it/2024/02/onlyoffice-docspace-per-zoom" :
    currentLanguage === "ja" ? "https://www.onlyoffice.com/blog/ja/2024/02/onlyoffice-docspace-app-for-zoom" :
    currentLanguage === "zh" ? "https://www.onlyoffice.com/blog/zh-hans/2024/02/onlyoffice-docspace-app-for-zoom" :
    "https://www.onlyoffice.com/blog/2024/02/onlyoffice-docspace-app-for-zoom";

  return (
    <StyledAdventAnnounce className={`${currentLanguage} ${stateMobile ? "active": ""}`}>
      <div className="advent-announce advent-mobile-hide">
        <InternalLink href={href}>
          <div className="advent-announce-text">
            <span dangerouslySetInnerHTML={{ __html: t("AdventAnnounceDesktop")}}></span>
          </div>
        </InternalLink>
      </div>
      <div className={`advent-announce advent-desktop-hide ${stateMobile ? "is-open": ""}`}>
        <InternalLink href={href}>
          <div className="advent-announce-text">
            <span dangerouslySetInnerHTML={{ __html: t("AdventAnnounceMobile")}}></span>
          </div>
        </InternalLink>
      </div>
    </StyledAdventAnnounce>
  )
}

export default AdventAnnounce;