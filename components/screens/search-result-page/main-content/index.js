import { useState, useEffect } from "react";
import Cards from "@components/screens/common/cards";
import Text from "@components/common/text";
import Box from "@components/common/box";
import {CategorySelector} from "@components/common/categorySelector";

import StyledMainContent from "./styled";
import {SortSelector} from "@components/common/sortSelector";

const MainContent = ({
  t,
  currentLanguage,
  data,
  page,
  sort,
  urlReqCategory,
  types,
  categories,
  compilations
}) => {
  const countData = data?.meta?.pagination?.total;
  const [typeSortData, setTypeSortData] = useState(t("NameA-Z"));
  const [boolTypeSortData, setBoolTypeSortData] = useState(false);

  const onChangeSelectTypeSort = (e) => {
    setTypeSortData(e.target.value);
  };

  useEffect(() => {
    if (sort === "desc") {
      setTypeSortData(t("NameZ-A"));
    } else {
      setTypeSortData(t("NameA-Z"));
    }
  }, [sort]);

  return (
    <StyledMainContent
      background="#F5F5F5"
      padding="84px 0 109px"
      tabletPadding="84px 0 103px 0"
      mobileLPadding="66px 0"
    >
      <div className="idk-box-template">
        <Box className="box-doc-info-template">
          <div className="box-doc-categories" id="mob-box-doc-categories">
            <CategorySelector
              typeSortData={typeSortData}
              onChangeSelectTypeSort={onChangeSelectTypeSort}
              locale={currentLanguage}
              className="form-control"
              t={t}
              types={types}
              categories={categories}
              compilations={compilations}
            />
          </div>
          <div className="box-doc-info">
            <Text className="box-doc-categories">
              {" "}
              {data?.data?.length > 0 ? data.data.length : countData ? data === null : 0} {t("Documents")}
            </Text>
            <SortSelector
              typeSortData={typeSortData}
              category={urlReqCategory}
              t={t}
            />
          </div>
        </Box>
        <Box className="box-cards-template" justifyContent="flex-end">
          <Cards
            t={t}
            data={data?.data}
            typeSortData={boolTypeSortData}
            currentLanguage={currentLanguage}
            page={page}
            sort={sort}
          />
        </Box>
      </div>
    </StyledMainContent>
  );
};

export default MainContent;
