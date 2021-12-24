import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Portal from "../../components/portal";

import { getConfig } from ".";
import axios from "axios";

const StyledPlaceholder = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 1001;
  top: 0;
`;

const DocEditorAPI = ({ id, name, link_oform_filling_file, check, config }) => {
  const IdDivPlaceholder = name
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase();

  const API = "https://oformconfig.teamlab.info/config/" + id;
  let [TMPconfig, setTMPConfig] = useState();
  const [token, setToken] = useState();
  const [callback, setCallback] = useState();

  useEffect(() => {
    if (id !== undefined && id !== null) {
      axios(API).then((res) => {
        setTMPConfig(res.data);
        setToken(res.data.token);
        setCallback(res.data.editorConfig.callbackurl);
      });
    }
  }, []);

  return check ? (
    <>
      <Helmet>
        <script async type="text/javascript">
          {`(window.docEditor = new DocsAPI.DocEditor("${IdDivPlaceholder}", {
                  token: "${token}",
                  type: "desktop",
                  document: {
                    fileType: "docx",
                    title: "${name}",
                    url: "${link_oform_filling_file}",
                    permissions: {
                      edit: false,
                      fillForms: true,
                    },
                  },
                  documentType: "word",
                  editorConfig: {
                    callbackurl: "${callback}",
                    customization: {
                        anonymous: {
                        request: false,
                    },
                    },
                  },
                  height: "100%",
                  width: "100%",
                }))
                `}
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
