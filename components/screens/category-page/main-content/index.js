import { useState, useEffect } from "react";

import Cards from "@components/screens/common/cards";
import Pagination from "@components/common/pagination";
import Selector from "@components/common/selector";
import Heading from "@components/common/heading";
import Text from "@components/common/text";
import Box from "@components/common/box";

import Breadcrumb from "./breadcrumb";
import StyledMainContent from "./style";

const MainContent = ({
  t,
  currentLanguage,
  data,
  page,
  sort,
  category,
  urlReqCategory,
}) => {
  const countData = data.meta?.pagination?.total;
  const countPage = data.meta?.pagination?.pageCount;
  const [typeSortData, setTypeSortData] = useState(t("NameA-Z"));
  const [boolTypeSortData, setBoolTypeSortData] = useState(false);

  const getPaginationGroup = new Array(countPage)
    .fill()
    .map((_, idx) => idx + 1);

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
      <Breadcrumb t={t} language={currentLanguage} category={category} />
      <div className="idk-box-template">
        <Box className="box-doc-info-template">
          <div className="box-doc-categories" id="mob-box-doc-categories">
            <Text className="box-doc-categories">
              {" "}
              {t("Documents")}: {countData}
            </Text>
          </div>
          <div className="box-doc-info">
            <Selector
              typeSortData={typeSortData}
              onChangeSelectTypeSort={onChangeSelectTypeSort}
              locale={currentLanguage}
              className="form-control"
              category={urlReqCategory}
              t={t}
            />
          </div>
        </Box>
        <Box className="box-cards-template" justifyContent="flex-end">
          <Cards
            t={t}
            data={data.data}
            typeSortData={boolTypeSortData}
            currentLanguage={currentLanguage}
            page={page}
            sort={sort}
          />
        </Box>
        <Pagination
          countPage={countPage}
          category={urlReqCategory}
          getPaginationGroup={getPaginationGroup}
          locale={currentLanguage}
          sort={sort}
        />
      </div>
    </StyledMainContent>
  );
};

export default MainContent;
