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
import Button from "../../../../components/button";

const MainContent = ({ t, language, count, ...rest }) => {
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

  // filter data state
  const [checkedItems, setCheckedItems] = useState({});
  const [filterArray, setFilterArray] = useState([]);
  const [reset, setReset] = useState(false);
  const [resetActive, setResetActive] = useState(false);

  const resetCkeckboxGroup = () => {
    setCheckedItems({});
    setReset(false);
    setResetActive(true);
  };

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
    setReset(true);
    setResetActive(false);
  };

  useEffect(() => {
    categoryCheckboxFilter();
  }, [checkedItems, reset]);

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

  const [groupCheckboxIsOpen, setGroupCheckboxIsOpen] = useState(false);
  const handleOpenGroupCheckbox = () => {
    setGroupCheckboxIsOpen(!groupCheckboxIsOpen);
  };

  const handleCloseGroupCheckbox = () => {
    setGroupCheckboxIsOpen(false);
  };

  const checkBoxSRC = groupCheckboxIsOpen
    ? "/icons/close-btn.svg"
    : "/icons/popup-arrow.react.svg";

  const numberDataItems = sortData.length;

  const [windowCheck, setWindowCheck] = useState("undefined");
  const [windowDesktop, setWindowDesktop] = useState("undefined");

  const windowDesktopCheck = () => {
    if (windowDesktop) {
      setGroupCheckboxIsOpen(true);
    } else {
      setGroupCheckboxIsOpen(false);
    }
  };

  useEffect(() => {
    if (typeof window !== windowCheck) {
      setWindowCheck(window.innerWidth <= 600);
      setWindowDesktop(window.innerWidth >= 1024);
      windowDesktopCheck();
    }
  }, [windowCheck, windowDesktop]);

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
          <div className="box-doc-categories" id="mob-box-doc-categories">
            <div
              className="box-doc-categories"
              onClick={handleOpenGroupCheckbox}
            >
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
          <div className="reset-checkbox-group-items">
            {reset && !windowCheck && (
              <span
                onClick={resetCkeckboxGroup}
                className="reset-group-checkbox"
              >
                {t("Reset")}
              </span>
            )}
            {windowCheck && (
              <>
                <span
                  onClick={resetCkeckboxGroup}
                  className="reset-group-checkbox"
                >
                  {t("Reset")}
                </span>
                <span className="reset-group-checkbox-mobile">
                  {t("Categories")}
                </span>
                <ReactSVG
                  className="tms-categories-svg"
                  src="/icons/close-btn.svg"
                  onClick={handleCloseGroupCheckbox}
                />
              </>
            )}
          </div>
          <div className="checkbox-group-filter-tems">
            {Categories.map((it) => (
              <Checkbox
                reset={resetActive}
                className="checkbox-card"
                onChange={handleChange}
                isChecked={checkedItems[it.isChecked]}
                key={`checkbox-card-${it.key}`}
                label={it.label}
                name={it.name}
              />
            ))}
          </div>
          {(reset || windowCheck) && (
            <Button
              className="checkbox-group-filter-btn"
              isScale
              label={t("apply filter")}
              onClick={handleCloseGroupCheckbox}
            />
          )}
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
