import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

import languages from "../../../languages.json";

const HeadSEO = ({
  metaDescription,
  metaDescriptionOg,
  metaKeywords,
  title,
  ...rest
}) => {
  return (
    <Helmet {...rest}>
      <title>{title}</title>
      <meta charset="utf-8" />

      <meta property="og:type" content="website" />
      <meta id="ctl00_MetaTitleOG" property="og:title" content="ONLYOFFICE" />
      <meta
        id="ctl00_MetaDescriptionOG"
        property="og:description"
        content={metaDescriptionOg}
      />
      <meta property="og:url" content="https://oforms.onlyoffice.com/" />
      <meta
        id="ctl00_MetaImageOG"
        property="og:image"
        content="https://static.onlyoffice.com/studio/tag/personal.11.5.3/skins/default/images/logo/fb_icon_325x325.jpg"
      />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />

      <meta id="ctl00_MetaKeywords" name="keywords" content={metaKeywords} />
      <meta name="description" content={metaDescription} />

      <link
        rel="icon"
        href="/images/logo/favicon_general.png"
        type="image/x-icon"
      />

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

      <script>
        {`
          <!-- Google Tag Manager -->
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5NW47TX');
          <!-- End Google Tag Manager -->
        `}
      </script>
    </Helmet>
  );
};

HeadSEO.propTypes = {
  /** Description of your web page */
  metaDescriptionOg: PropTypes.string,
  /** Description of your web page */
  metaDescription: PropTypes.string,
  /** Keywords for search engines */
  metaKeywords: PropTypes.string,
  /** Title for your HTML document */
  title: PropTypes.string,
};

HeadSEO.defaultProps = {
  metaDescriptionOg: null,
  metaDescription: null,
  metaKeywords: null,
  title: null,
};

export default HeadSEO;
