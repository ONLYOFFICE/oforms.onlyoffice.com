import Head from "next/head";
import Script from "next/script";
import PropTypes from "prop-types";
import languages from "@config/languages.json";
import { useRouter } from "next/router";

const MainHead = ({ title, description, isDesktopClient }) => {
  const router = useRouter();
  let style;

  if (isDesktopClient) {
    switch (router.query.theme) {
      case "theme-dark":
        style = `
          ::-webkit-scrollbar {
            border-radius: 3px !important;
            width: 8px !important;
            background: transparent !important;
          }
          
          ::-webkit-scrollbar:hover {
            border-radius: 3px !important;
            width: 8px !important;
            background: #404040 !important;
          }

          ::-webkit-scrollbar-thumb {
            border-radius: 3px !important;
            background: #404040 !important;
          }

          ::-webkit-scrollbar-thumb:hover {
            border-radius: 3px !important;
            background: #606060 !important;
          }
        `;
        break;
      case "theme-contrast-dark":
        style = `
          ::-webkit-scrollbar {
            border-radius: 3px !important;
            width: 8px !important;
            background: transparent !important;
          }

          ::-webkit-scrollbar:hover {
            border-radius: 3px !important;
            width: 8px !important;
            background: #252525 !important;
          }
            
          ::-webkit-scrollbar-thumb {
            border-radius: 3px !important;
            background: #404040 !important;
          }

          ::-webkit-scrollbar-thumb:hover {
            border-radius: 3px !important;
            background: #666666 !important;
          }
        `;
        break;
      default:
        style = `
          ::-webkit-scrollbar {
            border-radius: 3px !important;
            width: 8px !important;
            background: transparent !important;
          }

          ::-webkit-scrollbar:hover {
            border-radius: 3px !important;
            width: 8px !important;
            background: #F7F7F7 !important;
          }
            
          ::-webkit-scrollbar-thumb {
            border-radius: 3px !important;
            background: #E0E0E0 !important;
          }

          ::-webkit-scrollbar-thumb:hover {
            border-radius: 3px !important;
            background: #CCCCCC !important;
          }
        `;
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta id="ctl00_MetaTitleOG" property="og:title" content={title} />
        <meta id="ctl00_MetaDescriptionOG" property="og:description" content={description} />
        <meta property="og:url" content="https://oforms.onlyoffice.com/" />
        <meta id="ctl00_MetaImageOG" property="og:image" content="https://static.onlyoffice.com/studio/tag/personal.11.5.3/skins/default/images/logo/fb_icon_325x325.jpg" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3, shrink-to-fit=no, viewport-fit=cover" />
        <meta id="ctl00_MetaKeywords" name="keywords" content={title} />
        <meta name="description" content={description} />
        <link rel="apple-touch-icon" href="https://static-oforms.onlyoffice.com/images/logo/ONLYOFFICE-logo.png" />
        <meta name="google" content="notranslate" />
        <meta name="theme-light" />

        {isDesktopClient &&
          <style type="text/css">
            {style}
          </style>
        }
        
        {!isDesktopClient &&
          <link
            rel="icon"
            href="https://static-oforms.onlyoffice.com/images/logo/favicon_general.png"
            type="image/x-icon"
          />
        }

        {languages.map((lng) => {
          const { key, shortKey } = lng;

          return (
            <link
              key={key}
              rel="alternate"
              href={`https://oforms.onlyoffice.com/${shortKey === "en" ? "" : shortKey
                }`}
            />
          );
        })}
      </Head>

      {!isDesktopClient &&
        <Script
          id="googletagmanager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5NW47TX');
        `,
          }}
        />
      }
    </>
  );
};

MainHead.propTypes = {
  /** Description of your web page */
  description: PropTypes.string,
  /** Title for your HTML document */
  title: PropTypes.string,
};

MainHead.defaultProps = {
  description: null,
  title: null,
};

export default MainHead;
