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

const DocEditorAPI = ({ title, urlOform, scriptLoaded }) => {
  const urlAPI = Config.api.cms || "http://localhost:1337";
  const API = `${urlAPI}/api/config?title=${title}&url=${urlOform}`;
  const [config, setConfig] = useState();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (title !== undefined && urlOform !== undefined) {
      axios
        .get(API)
        .then((res) => {
          setConfig(JSON.stringify(res.data));
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
          {`(window.docEditor = new DocsAPI.DocEditor("${title}", ${config}))`}
        </script>
      </Helmet>
      <Portal>
        <StyledPlaceholder>
          <div id={title} style={{ height: "100%" }} />
        </StyledPlaceholder>
      </Portal>
    </>
  ) : null;
};

export default DocEditorAPI;
