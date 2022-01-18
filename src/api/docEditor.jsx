import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Portal from "../../components/portal";

import Config from "../../static/data/config.json";
import axios from "axios";

const StyledPlaceholder = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 1001;
  top: 0;
`;

const DocEditorAPI = ({ id, name, link_oform_filling_file, scriptLoaded }) => {
  const IdDivPlaceholder = name
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase();

  const API = `${Config.appServer}config/${id}`;
  const [config, setConfig] = useState();
  const [token, setToken] = useState();
  const [callback, setCallback] = useState();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (id !== undefined && id !== null) {
      axios(API, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
        .then((res) => {
          setConfig(JSON.stringify(res.data));
          setToken(res.data.token);
          setCallback(res.data.editorConfig.callbackurl);
          setCheck(true);
        })
        .catch((e) => {
          setCheck(false);
          if (typeof window !== "undefined") {
            window.location.replace("/404");
          }
        });
    }
  }, []);
  return check && scriptLoaded ? (
    <>
      <Helmet>
        <script defer type="text/javascript">
          {`(window.docEditor = new DocsAPI.DocEditor("${IdDivPlaceholder}", ${config}))`}
        </script>
      </Helmet>
      <Portal>
        <StyledPlaceholder>
          <div id={IdDivPlaceholder} style={{ height: "100%" }} />
        </StyledPlaceholder>
      </Portal>
    </>
  ) : null;
};

export default DocEditorAPI;
