import StyledAdventAnnounce from "./styled-advent-announce";

const AdventAnnounce = ({ t, locale, stateMobile }) => {
  return (
    <StyledAdventAnnounce className={`${locale} ${stateMobile ? "active": ""}`}>
      <a href={t("AdventAnnounceLink")} className={`advent-announce`}>
      <div className="advent-announce advent-mobile-hide">
        <div className="advent-announce-wrapper">
          <div className="advent-announce-text" dangerouslySetInnerHTML={{ __html: t("AdventAnnounceDesktop")}}></div>
        </div>
      </div>
      </a>
      <a href={t("AdventAnnounceLink")} className={`advent-announce advent-desktop-hide ${stateMobile ? "is-open": ""}`}>
        <div className="advent-announce-wrapper">
          <div className="advent-announce-text" dangerouslySetInnerHTML={{ __html: t("AdventAnnounceMobile")}}></div>
        </div>
      </a>
    </StyledAdventAnnounce>
  )
}

export default AdventAnnounce;