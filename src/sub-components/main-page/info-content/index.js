import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";

import Scrollbar from "../../../../components/scrollbar";
import Heading from "../../../../components/heading";
import Text from "../../../../components/text";
import Box from "../../../../components/box";
import Banner from "../banner-cards";

import StyledInfoContent from "./styled-content";
import ShortCard from "./short-card";

const InfoContent = ({ t, ...rest }) => {
  const data = useStaticQuery(graphql`
    {
      allDefJson {
        totalCount
        nodes {
          file_categories
          file_last_update
          file_description
          file_formats_download
          file_country_access
          file_image
          link_oform_filling_file
          name
          jsonId
        }
      }
    }
  `);

  const allItems = data.allDefJson.nodes;
  let tmpAllItems = [];
  for (let i = 0; i < 4; i++) {
    tmpAllItems.push(allItems[Math.floor(Math.random() * allItems.length)]);
  }

  let array_item = tmpAllItems.map((it) => {
    let subtitle = it.file_categories.join(" and ");
    let linkUrl = `/${it.name
      .replace(/\s/g, "-")
      .replace(/[{()}]/g, "")
      .toLowerCase()}`;
    let hrefButtom = it.name
      .replace(/\s/g, "-")
      .replace(/[{()}]/g, "")
      .toLowerCase();
    return {
      title: it.name,
      subtitle: subtitle,
      linkUrl: linkUrl,
      hrefButtom: hrefButtom,
    };
  });

  useEffect(() => {}, []);

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
        {t(", ready-to-fill out online document forms")}
      </Heading>
      <Text
        className="description-info-content"
        label={t(
          "Fill out the forms online in one click or download and open them them in ONLYOFFICE editors"
        )}
      />
      <Heading
        className="subheading-info-content"
        level={5}
        label={t("Featured templates")}
      />
      <Box justifyContent="space-between" className="box-info-content">
        <Scrollbar
          className="scrollbar-items-content"
          style={{ width: 1140, height: 250 }}
        >
          {array_item.map((it, idx) => (
            <ShortCard
              t={t}
              key={`items-short-card-${idx}`}
              title={it.title}
              subtitle={it.subtitle}
              linkUrl={it.linkUrl}
              hrefButtom={it.hrefButtom}
            />
          ))}
        </Scrollbar>
      </Box>
      <Banner t={t} />
    </StyledInfoContent>
  );
};

export default InfoContent;
