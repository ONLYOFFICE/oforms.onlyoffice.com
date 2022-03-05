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

const DocEditorAPI = ({ id, name, scriptLoaded }) => {
  const IdDivPlaceholder = name
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase();

  // const IdDivPlaceholder = "house-rental-lease-agreement-form";

  const API = `${Config.appServer}config/${id}`;
  const [config, setConfig] = useState();
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



  // let tmpConfig = {
  //   document: {
  //     key: "oform_0562945339293374307727613147707717",
  //     fileType: "oform",
  //     title: "House Rental (Lease) Agreement form",
  //     url: "https://oforms.onlyoffice.com/oforms-editor/en/oform/lease_(rental_house)_agreement.oform",
  //     permissions: {
  //       edit: false,
  //       fillForms: true,
  //     },
  //   },
  //   editorConfig: {
  //     callbackUrl: "https://oforms.onlyoffice.com/callback",
  //     customization: {
  //       anonymous: {
  //         request: false,
  //       },
  //     },
  //   },
  //   documentType: "word",
  //   height: "100%",
  //   width: "100%",
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudCI6eyJrZXkiOiJvZm9ybV8wNTYyOTQ1MzM5MjkzMzc0MzA3NzI3NjEzMTQ3NzA3NzE3IiwiZmlsZVR5cGUiOiJvZm9ybSIsInRpdGxlIjoiSG91c2UgUmVudGFsIChMZWFzZSkgQWdyZWVtZW50IGZvcm0iLCJ1cmwiOiJodHRwczovL29mb3Jtcy5vbmx5b2ZmaWNlLmNvbS9vZm9ybXMtZWRpdG9yL2VuL29mb3JtL2xlYXNlXyhyZW50YWxfaG91c2UpX2FncmVlbWVudC5vZm9ybSIsInBlcm1pc3Npb25zIjp7ImVkaXQiOmZhbHNlLCJmaWxsRm9ybXMiOnRydWV9fSwiZWRpdG9yQ29uZmlnIjp7ImNhbGxiYWNrVXJsIjoiaHR0cHM6Ly9vZm9ybXMub25seW9mZmljZS5jb20vY2FsbGJhY2siLCJjdXN0b21pemF0aW9uIjp7ImFub255bW91cyI6eyJyZXF1ZXN0IjpmYWxzZX19fSwiZG9jdW1lbnRUeXBlIjoid29yZCIsImhlaWdodCI6IjEwMCUiLCJ3aWR0aCI6IjEwMCUiLCJpYXQiOjE2NDYzMDIzNTl9.JVenI_Ns0CPPlff7uhU_WTiB1qOEHPckVHm6VLsPEfA",
  // };


  // useEffect(() => {
  //   setConfig(JSON.stringify(tmpConfig));
  //   setCheck(true);
  // }, []);

  // console.log("scriptLoaded = ",scriptLoaded)
  // console.log("check = ",check)

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
