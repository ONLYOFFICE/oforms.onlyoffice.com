import StyledAdventAnnounce from "./styled-advent-announce";

const AdventAnnounce = ({ t, locale, stateMobile }) => {
  return (
    <StyledAdventAnnounce className={`${locale} ${stateMobile ? "active": ""}`}>
      <div className="advent-announce advent-mobile-hide">
        <a href={t("blogLink1")}>
          <div className="advent-announce-text">
            <div dangerouslySetInnerHTML={{ __html: t("AdventAnnounceDesktop")}}></div>
          </div>
        </a>
      </div>
      <div className={`advent-announce advent-desktop-hide ${stateMobile ? "is-open": ""}`}>
        <a href={t("blogLink1")}>
          <div className="advent-announce-text">
            <div dangerouslySetInnerHTML={{ __html: t("AdventAnnounceMobile")}}></div>
          </div>
        </a>
      </div>
    </StyledAdventAnnounce>
  )
}

export default AdventAnnounce;