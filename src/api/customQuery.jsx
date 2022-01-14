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
      allDefJson {
        totalCount
        nodes {
          file_categories
          file_last_update
          file_description
          file_formats_download
          file_country_access
          file_image
          link_oform_filling_file
          name
          jsonId
        }
      }
    }
  `);

  const allItems = data.allDefJson.nodes;

  let index;
  const itemsId = allItems.find((it, idx) => {
    const pathName = it.name
      .replace(/\s/g, "-")
      .replace(/[{()}]/g, "")
      .toLowerCase();
    if (pathName === fillform) {
      index = idx;
      return it;
    }
  });
  const name = itemsId?.name;
  const id = index;
  const link_file = itemsId?.link_oform_filling_file;

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
  return name !== undefined && id !== undefined ? (
    <>
      <Helmet onChangeClientState={handleChangeClientState}>
        {typeof window !== "undefined" && typeof myScript === "undefined" && (
          <script async defer src={srcWebAppAPI} />
        )}
      </Helmet>
      <DocEditorAPI
        name={name}
        link_oform_filling_file={link_file}
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
