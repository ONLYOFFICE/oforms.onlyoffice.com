import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { ReactSVG } from "react-svg";

import { Categories } from "../../../helpers/categories";
import {
  increaseDecreaseName,
  decreaseIncreaseName,
  ObjectFilter,
} from "./sort-data";

import Heading from "../../../../components/heading";
import Text from "../../../../components/text";
import Selector from "../../../../components/selector";
import Box from "../../../../components/box";
import Checkbox from "../../../../components/checkbox";

import Cards from "./sub-components/cards";

import StyledMainContent from "./styled-main-content";
// TO DO replace sort
const MainContent = ({ t, language, count, ...rest }) => {
  const data = useStaticQuery(graphql`
    {
      allOformsJson {
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
        }
      }
    }
  `);

  const allItems = data.allOformsJson.nodes;

  // filter data state
  const [checkedItems, setCheckedItems] = useState({});
  const [filterArray, setFilterArray] = useState([]);

  const categoryCheckboxFilter = () => {
    const tmpCheckedItems = ObjectFilter(
      checkedItems,
      (checkedItems) => checkedItems === true
    );

    if (Object.getOwnPropertyNames(tmpCheckedItems).length === 0) {
      setFilterArray(allItems);
    } else {
      const boolCheckedItems = ObjectFilter(
        checkedItems,
        (checkedItems) => checkedItems === true
      );

      const objCheckedCategory = Object.keys(boolCheckedItems);
      const tmpItems = allItems.filter((it) => {
        for (let i = 0; i < it.file_categories.length; i++) {
          if (
            objCheckedCategory.includes(it.file_categories[i].toLowerCase())
          ) {
            return { ...it };
          }
        }
      });
      setFilterArray(tmpItems);
    }
  };

  const handleChange = (e) => {
    setCheckedItems({
      ...checkedItems,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    categoryCheckboxFilter();
  }, [checkedItems]);

  // sort data state
  const [sortData, setSortData] = useState([]);
  const [typeSortData, setTypeSortData] = useState("Newest - Oldest");
  const [boolTypeSortData, setBoolTypeSortData] = useState(false);

  const onChangeSelectTypeSort = (e) => {
    setTypeSortData(e.target.value);
  };

  const handlerSortData = () => {
    const checkFilterArray = filterArray;
    let tmp;
    if (typeSortData === "Newest - Oldest") {
      tmp = checkFilterArray.sort(increaseDecreaseName);
      setBoolTypeSortData(false);
      setSortData(tmp);
    }
    if (typeSortData === "Oldest - Newest") {
      tmp = checkFilterArray.sort(decreaseIncreaseName);
      setBoolTypeSortData(true);
      setSortData(tmp);
    }
  };

  useEffect(() => {
    handlerSortData();
  }, [typeSortData, filterArray]);

  useEffect(() => {
    categoryCheckboxFilter();
  }, [typeSortData, checkedItems]);

  /** */
  const [groupCheckboxIsOpen, setGroupCheckboxIsOpen] = useState(false);
  const handleOpenGroupCheckbox = () => {
    setGroupCheckboxIsOpen(!groupCheckboxIsOpen);
  };

  const checkBoxSRC = groupCheckboxIsOpen
    ? "/icons/close-btn.svg"
    : "/icons/popup-arrow.react.svg";

  const numberDataItems = sortData.length;

  return (
    <StyledMainContent
      background="#F5F5F5"
      groupCheckboxIsOpen={groupCheckboxIsOpen}
      {...rest}
    >
      <Heading
        className="heading-cards"
        textAlign="center"
        label={t("Form templates")}
      />
      <div className="idk-box-template">
        <Box className="box-doc-info-template">
          <div
            className="box-doc-categories"
            id="mob-box-doc-categories"
            onClick={handleOpenGroupCheckbox}
          >
            <div className="box-doc-categories">
              <Text isBold label={t("Categories")} />
              <ReactSVG className="categories-svg" src={checkBoxSRC} />
            </div>
            <Text className="text-control-mob">
              {" "}
              {t("Documents:")} {numberDataItems}
            </Text>
          </div>
          <div className="box-doc-info">
            <Text className="text-control">
              {" "}
              {t("Documents:")} {numberDataItems}
            </Text>
            <Selector
              typeSortData={typeSortData}
              onChangeSelectTypeSort={onChangeSelectTypeSort}
              className="form-control"
              t={t}
            />
          </div>
        </Box>
        <div className="checkbox-card-group">
          {Categories.map((it) => (
            <Checkbox
              className="checkbox-card"
              onChange={handleChange}
              isChecked={checkedItems[it.name]}
              key={it.key}
              label={it.label}
              name={it.name}
            />
          ))}
        </div>
        <Box className="box-cards-template" justifyContent="flex-end">
          <Cards
            t={t}
            data={sortData}
            typeSortData={boolTypeSortData}
            groupCheckboxIsOpen={groupCheckboxIsOpen}
          />
        </Box>
      </div>
    </StyledMainContent>
  );
};

export default MainContent;
