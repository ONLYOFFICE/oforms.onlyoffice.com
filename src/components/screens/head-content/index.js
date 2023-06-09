import Head from "next/head";
import Script from "next/script";
import PropTypes from "prop-types";

import languages from "@config/languages.json";
import {useRouter} from "next/router";
import {useMemo} from "react";
import {css} from "styled-components";

const HeadSEO = ({
                     metaSiteNameOg,
                     metaDescription,
                     metaDescriptionOg,
                     metaKeywords,
                     title,
                     isDesktopClient,
                 }) => {
    const router = useRouter()
    const theme = router.query.theme || 'theme-classic'
    const style = useMemo(() => {
        let result;
        switch (theme) {
            case 'theme-classic': {
                result = <style type="text/css">
                    {`
                        body::-webkit-scrollbar {
                            width: 8px !important;
                        }
                        
                        body::-webkit-scrollbar-track {
                            background: #FFFFFF !important;
                        }
                        
                        body::-webkit-scrollbar-track:hover {
                            background: #F7F7F7 !important;
                        }
                        
                        body::-webkit-scrollbar-thumb {
                            background-color: #E0E0E0 !important;
                            border-radius: 3px !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar {
                            width: 8px !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar-track {
                            background: #FFFFFF !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar-track:hover {
                            background: #CFCFCF !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar-thumb {
                            background-color: #E0E0E0 !important;
                            border-radius: 3px !important;
                        }
                        
                        * {
                            scrollbar-width: thin !important;
                            scrollbar-color: #E0E0E0 #F7F7F7 !important;
                        }
                    `}
                </style>
                break;
            }
            case 'theme-light': {
                result = <style>
                    {`
                        body::-webkit-scrollbar {
                            width: 8px !important;
                        }
                        
                        body::-webkit-scrollbar-track {
                            background: #FFFFFF !important;
                        }
                        
                        body::-webkit-scrollbar-track:hover {
                            background: #F7F7F7 !important;
                        }
                        
                        body::-webkit-scrollbar-thumb {
                            background-color: #E0E0E0 !important;
                            border-radius: 3px !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar {
                            width: 8px !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar-track {
                            background: #FFFFFF !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar-track:hover {
                            background: #F7F7F7 !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar-thumb {
                            background-color: #E0E0E0 !important;
                            border-radius: 3px !important;
                        }
                        
                        * {
                            scrollbar-width: thin !important;
                            scrollbar-color: #E0E0E0 #F7F7F7 !important;
                        }
                    `}
                </style>
                break;
            }
            case 'theme-dark': {
                result = <style type="text/css">
                    {`
                        body::-webkit-scrollbar {
                            width: 8px !important;
                        }

                        body::-webkit-scrollbar-track {
                            background: #333333 !important;
                        }
                        
                        body::-webkit-scrollbar-track:hover {
                            background: #404040 !important;
                        }
                        
                        body::-webkit-scrollbar-thumb {
                            background-color: #606060 !important;
                            border-radius: 3px;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar {
                            width: 8px !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar-track {
                            background: #333333 !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar-track:hover {
                            background: #404040 !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar-thumb {
                            background-color: #606060 !important;
                            border-radius: 3px !important;
                        }
                        
                        * {
                            scrollbar-width: thin !important;
                            scrollbar-color: #606060 #404040 !important;
                        }
                    `}
                </style>
                break;
            }
            case 'theme-contrast-dark': {
                result = <style type="text/css">
                    {`
                        body::-webkit-scrollbar {
                            width: 8px !important;
                        }
                        
                        body::-webkit-scrollbar-track {
                            background: #1E1E1E !important;
                        }
                        
                        body::-webkit-scrollbar-track:hover {
                            background: #252525 !important;
                        }
                        
                        body::-webkit-scrollbar-thumb {
                            background-color: #606060 !important;
                            border-radius: 3px !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar {
                            width: 8px !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar-track {
                            background: #1E1E1E !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar-track:hover {
                            background: #252525 !important;
                        }
                        
                        .modal-with-scroll::-webkit-scrollbar-thumb {
                            background-color: #606060 !important;
                            border-radius: 3px !important;
                        }
                        
                        * {
                            scrollbar-width: thin !important;
                            scrollbar-color: #606060 #252525 !important;
                        }
                    `}
                </style>
            }
        }

        return result
    }, [theme])
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8"/>
                <meta property="og:type" content="website"/>
                <meta
                    id="ctl00_MetaSiteNameOG"
                    property="og:site_name"
                    content={metaSiteNameOg}
                />
                <meta id="ctl00_MetaTitleOG" property="og:title" content={title}/>
                <meta
                    id="ctl00_MetaDescriptionOG"
                    property="og:description"
                    content={metaDescriptionOg}
                />
                <meta property="og:url" content="https://oforms.onlyoffice.com/"/>
                <meta
                    id="ctl00_MetaImageOG"
                    property="og:image"
                    content="https://static.onlyoffice.com/studio/tag/personal.11.5.3/skins/default/images/logo/fb_icon_325x325.jpg"
                />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=3, shrink-to-fit=no, viewport-fit=cover"
                />

                <meta id="ctl00_MetaKeywords" name="keywords" content={metaKeywords}/>
                <meta name="description" content={metaDescription}/>

                <link rel="apple-touch-icon"
                      href="https://static-oforms.onlyoffice.com/images/logo/ONLYOFFICE-logo.png"/>

                <meta name="google" content="notranslate"/>
                { isDesktopClient && style}
                {
                    !isDesktopClient &&
                    <link
                        rel="icon"
                        href="https://static-oforms.onlyoffice.com/images/logo/favicon_general.png"
                        type="image/x-icon"
                    />
                }

                {languages.map((lng) => {
                    const {key, shortKey} = lng;
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

                <meta name="theme-light"/>
            </Head>
            {
                !isDesktopClient &&
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

HeadSEO.propTypes = {
    metaSiteNameOg: PropTypes.string,
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
    metaSiteNameOg: "ONLYOFFICE",
    metaDescriptionOg: null,
    metaDescription: null,
    metaKeywords: null,
    title: null,
};

export default HeadSEO;
