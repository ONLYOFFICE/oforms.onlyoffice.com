import React from "react";

import Scrollbar from "../../../../components/scrollbar";
import Heading from "../../../../components/heading";
import Text from "../../../../components/text";
import Box from "../../../../components/box";
import Banner from "../banner-cards";

import StyledInfoContent from "./styled-content";
import ShortCard from "./short-card";
import array_item from "./items";

const InfoContent = ({ t, ...rest }) => {
  return (
    <StyledInfoContent
      background="#333333"
      padding="116px 0 0 0"
      tabletPadding="116px 0 0 0"
      mobileLPadding="75px 0 0 0"
      {...rest}
    >
      <Heading className="heading-info-content">
        <span style={{ color: "#FF6F3D" }}>OFORMS</span>
        {t(" FREE ready-to-fill out online forms")}
      </Heading>
      <Text
        className="description-info-content"
        label={t(
          "Fill out the forms online in one click or download and open them in ONLYOFFICE."
        )}
      />
      <Heading
        className="subheading-info-content"
        level={5}
        label={t("Featured forms")}
      />
      <Box justifyContent="space-between" className="box-info-content">
        <Scrollbar
          className="scrollbar-items-content"
          style={{ width: 1140, height: 250 }}
        >
          {array_item.map((it, idx) => {
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
                linkUrl={it.linkUrl}
                hrefButtom={href}
              />
            );
          })}
        </Scrollbar>
      </Box>
      <Banner t={t} />
    </StyledInfoContent>
  );
};

export default InfoContent;
