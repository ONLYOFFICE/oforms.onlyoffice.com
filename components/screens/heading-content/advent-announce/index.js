import StyledAdventAnnounce from "./styled-advent-announce";

const AdventAnnounce = ({t, currentLanguage}) => {
  const hrefLang = `https://onlyoffice.com/blog/${
    currentLanguage === "zh" ? "zh-hans" : `${currentLanguage}`
  }`;

  return (
    <StyledAdventAnnounce>
      <div className="advent-announce advent-mobile-hide">

        <a href={`${hrefLang}/2022/11/meet-onlyoffice-docs-saas/`} target="_blank" rel="noreferrer noopener">
          <div className="advent-announce-text">
            {t("Meet")}<b>{t("ONLYOFFICE Docs SaaS")}</b>{t("the cloud-based version of the ONLYOFFICE online suite")} 
          </div>
        </a>
      </div>
      <div className="advent-announce advent-desktop-hide">

        <a href={`${hrefLang}/2022/11/meet-onlyoffice-docs-saas/`} target="_blank" rel="noreferrer noopener">
          <div className="advent-announce-text">
            &nbsp;<b>{t("Meet ONLYOFFICE Docs SaaS")}</b>&nbsp;
          </div>
        </a>
      </div>
    </StyledAdventAnnounce>
  )
}

export default AdventAnnounce;