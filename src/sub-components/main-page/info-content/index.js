import React from "react";

import Scrollbar from "../../../../components/scrollbar";
import Heading from "../../../../components/heading";
import Text from "../../../../components/text";
import Box from "../../../../components/box";
import Banner from "../banner-cards";

import StyledInfoContent from "./styled-content";
import ShortCard from "./short-card";
import array_item from "./items";

const InfoContent = ({ t, currentLanguage, ...rest }) => {
  let lng = currentLanguage === "en" ? "" : `/${currentLanguage}`;
  return (
    <StyledInfoContent
      background="#333333"
      padding="158px 0 0 0"
      tabletPadding="134px 0 0 0"
      mobileLPadding="134px 0 0 0"
      {...rest}
    >
      <Heading className="heading-info-content">
        <span style={{ color: "#FF6F3D" }}>{t("OFORMS")}: </span>
        {t("FREEforms")}
      </Heading>
      <Text className="description-info-content" label={t("FillOutTheForms")} />
      <Heading
        className="subheading-info-content"
        level={5}
        label={t("FeaturedForms")}
      />
      <Box justifyContent="space-between" className="box-info-content">
        <Scrollbar
          className="scrollbar-items-content"
          style={{ width: 1140, height: 250 }}
        >
          {array_item[currentLanguage]?.map((it, idx) => {
            let href = it.title
              .replace(/\s/g, "-")
              .replace(/[{()}]/g, "")
              .toLowerCase();
            return (
              <ShortCard
                t={t}
                key={`items-short-card-${idx}`}
                title={it.title}
                subtitle={it.subtitle}
                linkUrl={lng + it.linkUrl}
                hrefButtom={href}
              />
            );
          })}
        </Scrollbar>
      </Box>
      <Banner t={t} currentLanguage={currentLanguage} />
    </StyledInfoContent>
  );
};

export default InfoContent;
