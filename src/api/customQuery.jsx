import React from "react";
import PropTypes from "prop-types";
import withLocation from "../hooks/hoc";
import { useStaticQuery, graphql } from "gatsby";

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
  const itemsId = allItems.find((it, idx) => {
    const pathName = it.name
      .replace(/\s/g, "-")
      .replace(/[{()}]/g, "")
      .toLowerCase();
    if (pathName === fillform) {
      return idx;
    }
  });
  const name = itemsId?.name;
  const id = itemsId?.jsonId;
  const link_file = itemsId?.link_oform_filling_file;

  return name !== undefined && id !== null ? (
    <DocEditorAPI name={name} link_oform_filling_file={link_file} id={id} />
  ) : (
    typeof window !== "undefined" && window.location.replace("/404")
  );
};

CustomQueryStringComponent.propTypes = {
  search: PropTypes.object,
};

export default withLocation(CustomQueryStringComponent);
