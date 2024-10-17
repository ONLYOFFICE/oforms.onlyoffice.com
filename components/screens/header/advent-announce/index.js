import StyledAdventAnnounce from "./styled-advent-announce";

const AdventAnnounce = ({ t, locale, stateMobile }) => {
  return (
    <StyledAdventAnnounce locale={locale} className={`${locale} ${stateMobile ? "active": ""}`}>
      <div className="advent-announce advent-mobile-hide">
        <div className="advent-announce-wrapper">
          <div className="advent-announce-text" dangerouslySetInnerHTML={{ __html: t("AdventAnnounceDesktop")}}></div>
          <a className="advent-announce-link advent-announce-blog-link" href={t("AdventAnnounceLink")}>{t("Learn more")}</a>
          <a className="advent-announce-link advent-announce-webinars-link" href={t("AdventAnnounceWebinarsLink")}>{t("Register")}</a>
        </div>
      </div>
      <a href={t("AdventAnnounceLink")} className={`advent-announce advent-desktop-hide ${stateMobile ? "is-open": ""}`}>
        <div className="advent-announce-wrapper">
          <div className="advent-announce-text" dangerouslySetInnerHTML={{ __html: t("AdventAnnounceMobile")}}></div>
        </div>
      </a>
    </StyledAdventAnnounce>
  )
}

export default AdventAnnounce;