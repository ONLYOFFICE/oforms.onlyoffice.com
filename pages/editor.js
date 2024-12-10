import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import axios from "axios";
import Helmet from "react-helmet"

import CONFIG from "@config/config";
import Layout from "@components/layout";
import MainHead from "@components/screens/head";

const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";

const EditorPage = ({ data, serfilename }) => {
  const { query: { lang, filename, fillform }} = useRouter();
  const [loadScript, setLoadScript] = useState(false);
  const [config, setConfig] = useState();
  const [check, setCheck] = useState(false);

  const srcDocEditorAPI = (CONFIG.docEditorUrl || "http://localhost") + "/web-apps/apps/api/documents/api.js";

  const getConfig = () => {
    if (serfilename === filename && fillform !== undefined) {
      const urlCMSConfigAPI = `${CMSConfigAPI}/api/config?lang=${lang}&title=${filename}&url=${fillform}`;
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

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <Layout headerContent={false} footerContent={false}>
      <Layout.PageHead>
        <MainHead />
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
          <Helmet>          
            <script defer type="text/javascript">
              {`(window.docEditor = new DocsAPI.DocEditor("${filename}", ${config}))`}
            </script>
          </Helmet>

          <div style={{ 
            position: "fixed",
            top: "0",
            width: "100vw",
            height: "100vh",
            zIndex: "1001",
          }}>
            <div id={filename} style={{ height: "100%" }} />
          </div>
        </>
      ) : null}
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const serfilename = context.query.filename;
  const res = await fetch(`${CMSConfigAPI}/api/oforms/?filters[url][$eq]=${context.query.filename}&locale=${context.locale === "pt" ? "pt-br" : context.locale}`);
  const data = await res.json();

  if (data.data.length === 0) {
    return {
      redirect: {
        destination: `${context.query.locale}/404`,
        permanent: true,
      },
    };
  }

  return { 
    props: {
      data,
      serfilename
    }
  };
};

export default EditorPage;
