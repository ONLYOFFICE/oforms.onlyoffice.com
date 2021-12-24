import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Portal from "../../components/portal";

import { getConfig } from ".";


const StyledPlaceholder = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 1001;
  top: 0;
`;

const DocEditorAPI = ({ id, name, link_oform_filling_file, check }) => {
  const IdDivPlaceholder = name
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase();

  const [config, setConfig] = useState({});
  useEffect(() => {
    console.log("config check = ", id !== undefined);
    if (id !== undefined) {
      const getCnf = () =>
        getConfig(id)
          .then((res) => {
            setConfig(res);
          })
          .catch((err) => console.log(`${err}`));

      getCnf();
    }
  });
  console.log("config");
  console.log(config);
  console.log(check);
  console.log(id);


  return check ? (
    <>
      <Helmet>
        <script async type="text/javascript">
          {/* {`
            (window.docEditor = new DocsAPI.DocEditor("${IdDivPlaceholder}", config))
          `} */}

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
