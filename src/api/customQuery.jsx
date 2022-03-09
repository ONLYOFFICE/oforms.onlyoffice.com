import React, { useState } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import withLocation from "../hooks/hoc";
import { useStaticQuery, graphql } from "gatsby";

import config from "../../static/data/config.json";

import DocEditorAPI from "./docEditor";

const CustomQueryStringComponent = ({ search }) => {
  const { fillform } = search;
  const data = useStaticQuery(graphql`
    {
      allDataJson {
        edges {
          node {
            data {
              id
              attributes {
                name_form
                file_oform {
                  data {
                    attributes {
                      name
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const allItems = data?.allDataJson?.edges[1].node.data;

  let index;
  const itemsId = allItems?.find(({ attributes }, idx) => {
    const pathName = attributes.name_form
      .replace(/\s/g, "-")
      .replace(/[{()}]/g, "")
      .toLowerCase();
    if (pathName === fillform) {
      index = idx;
      return { ...attributes };
    }
  });

  const name = itemsId?.attributes.name_form;
  const id = index;
  const link_file = itemsId?.attributes.file_oform?.data;
  let oformFile;
  link_file?.filter((it) => {
    let checkFormatFile = it?.attributes.name.split(".")[1] === "oform";
    oformFile = checkFormatFile ? it?.attributes?.name : null;
  });

  const srcWebAppAPI =
    (config.docEditorUrl || "http://localhost") +
    "/web-apps/apps/api/documents/api.js";
  const myScriptUrl = srcWebAppAPI;

  const [scriptLoaded, setScriptLoaded] = useState(
    typeof window !== "undefined" && typeof myScript !== "undefined"
  );
  const handleChangeClientState = (newState, addedTags) => {
    if (addedTags && addedTags.scriptTags) {
      const foundScript = addedTags.scriptTags.find(
        ({ src }) => src === myScriptUrl
      );
      if (foundScript) {
        foundScript.addEventListener("load", () => setScriptLoaded(true), {
          once: true,
        });
      }
    }
  };
  return name !== undefined && oformFile !== undefined ? (
    <>
      <Helmet onChangeClientState={handleChangeClientState}>
        {typeof window !== "undefined" && typeof myScript === "undefined" && (
          <script async defer src={srcWebAppAPI} />
        )}
      </Helmet>
      <DocEditorAPI
        name={name}
        link_file={oformFile}
        id={id}
        scriptLoaded={scriptLoaded}
      />
    </>
  ) : (
    typeof window !== "undefined" && window.location.replace("/404")
  );
};

CustomQueryStringComponent.propTypes = {
  search: PropTypes.object,
};

export default withLocation(CustomQueryStringComponent);
