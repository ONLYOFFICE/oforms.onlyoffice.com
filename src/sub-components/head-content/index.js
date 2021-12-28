import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

import config from "../../../static/data/config.json";
import languages from "../../../languages.json";

const HeadSEO = ({ metaDescription, metaKeywords, title, ...rest }) => {
  const srcWebAppAPI =
    (config.docEditorUrl || "http://localhost") + "/web-apps/apps/api/documents/api.js";

    return (
    <Helmet {...rest}>
      <title>{title}</title>
      <meta charset="utf-8" />

      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />

      <meta id="ctl00_MetaKeywords" name="keywords" content={metaKeywords} />
      <meta name="description" content={metaDescription} />

      <link rel="icon" href="/images/logo/favicon_general.png" type="image/x-icon" />

      {languages.map((lng) => {
        const { key, shortKey } = lng;
        return (
          <link
            key={key}
            rel="alternate"
            href={`https://oforms.onlyoffice.com/${
              shortKey === "en" ? "" : shortKey
            }`}
          />
        );
      })}

      <script async type="text/javascript" src={srcWebAppAPI} />
    </Helmet>
  );
};

HeadSEO.propTypes = {
  /** Description of your web page */
  metaDescription: PropTypes.string,
  /** Keywords for search engines */
  metaKeywords: PropTypes.string,
  /** Title for your HTML document */
  title: PropTypes.string,
};

HeadSEO.defaultProps = {
  metaDescription: null,
  metaKeywords: null,
  title: null,
};

export default HeadSEO;
