import StyledAdventAnnounce from "./styled-advent-announce";

const AdventAnnounce = ({t, currentLanguage}) => {
  const hrefLang = `https://onlyoffice.com/blog/${
    currentLanguage === "zh" ? "zh-hans" : `${currentLanguage}`
  }`;

  return (
    <StyledAdventAnnounce>
      <div className="advent-announce advent-mobile-hide">
        <a href={`${hrefLang}/2022/09/onlyoffice-docs-7-2`} target="_blank" rel="noreferrer noopener">
          <div className="advent-announce-text">
            {t("Discover")} &nbsp;<b>ONLYOFFICE Docs v7.2</b>&nbsp; {t("with plugin marketplace, new form fields, live viewer, ligatures,")} <br />{t("updated UI, and more")}
          </div>
        </a>
      </div>
      <div className="advent-announce advent-desktop-hide">
        <a href={`${hrefLang}/2022/09/onlyoffice-docs-7-2`} target="_blank" rel="noreferrer noopener">
          <div className="advent-announce-text">
            &nbsp;<b>{t("Discover ONLYOFFICE Docs v7.2")}</b>&nbsp;
          </div>
        </a>
      </div>
    </StyledAdventAnnounce>
  )
}

export default AdventAnnounce;