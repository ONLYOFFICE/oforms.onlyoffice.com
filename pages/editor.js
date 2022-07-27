import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import axios from "axios";
import Head from "next/head";

import CONFIG from "@config/config";
import Layout from "@components/layout";
import HeadSEO from "@components/screens/head-content";
import Portal from "@components/common/portal";
import StyledPlaceholder from "@components/screens/editor-page";

const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";

const OformsEditorPage = ({ data, serfilename }) => {
  const {
    query: { filename, fillform },
  } = useRouter();
  const [loadScript, setLoadScript] = useState(false);
  const [config, setConfig] = useState();
  const [check, setCheck] = useState(false);

  const srcDocEditorAPI =
    (CONFIG.docEditorUrl || "http://localhost") +
    "/web-apps/apps/api/documents/api.js";

  const getConfig = () => {
    if (serfilename === filename && fillform !== undefined) {
      const urlCMSConfigAPI = `${CMSConfigAPI}/api/config?title=${filename}&url=${fillform}`;
      axios(urlCMSConfigAPI)
        .then((res) => {
          setConfig(JSON.stringify(res.data));
          setCheck(true);
        })
        .catch((e) => {
          setCheck(e);
          if (typeof window !== "undefined") {
            window.location.replace("/404");
          }
        });
    } else {
      window.location.replace("/404");
    }
  };

  const runScript = () => {
    return (
      <Head>
            <script defer type="text/javascript">
              {`(window.docEditor = new DocsAPI.DocEditor("${filename}", ${config}))`}
            </script>
      </Head>
    )
  }

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <Layout headerContent={false} footerContent={false}>
      <Layout.PageHead>
        <HeadSEO />
        <Script
          id="doc-editor"
          src={srcDocEditorAPI}
          onLoad={() => {
            setLoadScript(true);
          }}
        />
      </Layout.PageHead>
      {check && loadScript ? (
        <>

          {/* <Head>
            <script defer type="text/javascript">
              {`(window.docEditor = new DocsAPI.DocEditor("${filename}", ${config}))`}
            </script>
          </Head> */}
          
          <Portal selector="#modal">
            <StyledPlaceholder>
              <div id={filename} style={{ height: "100%" }} />
            </StyledPlaceholder>
          </Portal>
          <script defer type="text/javascript">
              {`(window.docEditor = new DocsAPI.DocEditor("${filename}", ${config}))`}
          </script>
        </>
      ) : null}
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const serfilename = context.query.filename;
  const res = await fetch(
    `${CMSConfigAPI}/api/oforms/?filters[url][$eq]=${context.query.filename}&locale=${context.locale}`
  );
  const data = await res.json();
  if (data.data.length === 0) {
    return {
      redirect: {
        destination: `${context.query.locale}/404`,
        permanent: true,
      },
    };
  }

  return { props: { data, serfilename } };
};

export default OformsEditorPage;   
