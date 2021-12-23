import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Portal from "../../components/portal";

const StyledPlaceholder = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 1001;
  top: 0;
`;

const DocEditorAPI = ({ name, link_oform_filling_file, check }) => {
  const IdDivPlaceholder = name
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase();

  return check ? (
    <>
      <Helmet>
        <script async type="text/javascript">
          {`(window.docEditor = new DocsAPI.DocEditor("${IdDivPlaceholder}", {
                  document: {
                    fileType: "oform",
                    title: "${name}",
                    url: "${link_oform_filling_file}",
                    permissions: {
                      edit: false,
                      fillForms: true,
                    },
                  },
                  documentType: "word",
                  editorConfig: {
                    mode: "edit",
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
