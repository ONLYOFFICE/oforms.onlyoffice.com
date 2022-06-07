import Scrollbar from "@components/common/scrollbar";
import Heading from "@components/common/heading";
import Box from "@components/common/box";
import Banner from "../../common/banner";

import StyledInfoContent from "./styled-content";
import { ShortCard } from "@components/common/card";
import itemsShortCards from "@utils/data/pages/short-cards";

const InfoContent = ({ t, currentLanguage }) => {
  let lng = currentLanguage === "en" ? "" : `/${currentLanguage}`;
  const shortCardItems = itemsShortCards[currentLanguage]?.map((it, idx) => {
    let url = it.title
      .replace(/\s/g, "-")
      .replace(/[{()}]/g, "")
      .toLowerCase();
    let href = `${lng}/editor/?filename=${url}&fillform=${it.fillForm}`;
    return (
      <ShortCard
        t={t}
        key={`items-short-card-${idx}`}
        title={it.title}
        subtitle={it.subtitle}
        linkUrl={lng + it.linkUrl}
        hrefButtom={href}
        alt={it.title}
      />
    );
  });
  return (
    <StyledInfoContent
      background="#333333"
      padding="158px 0 0 0"
      tabletPadding="134px 0 0 0"
      mobileLPadding="134px 0 0 0"
    >
      <Heading className="heading-info-content">
        <span style={{ color: "#FF6F3D" }}>{t("OFORMS")}: </span>
        {t("FREEforms")}
      </Heading>
      <Heading
        level={2}
        className="description-info-content"
        label={t("FillOutTheForms")}
      />
      <Heading
        className="subheading-info-content"
        level={3}
        label={t("FeaturedForms")}
      />
      <Box justifyContent="space-between" className="box-info-content">
        <Scrollbar
          className="scrollbar-items-content"
          style={{ width: 1140, height: 250 }}
        >
          {shortCardItems}
        </Scrollbar>
      </Box>
      <Banner t={t} currentLanguage={currentLanguage} />
    </StyledInfoContent>
  );
};

export default InfoContent;
