import { useState, useEffect } from "react";

import Cards from "@components/screens/common/cards";
import Pagination from "@components/common/pagination";
import Selector from "@components/common/selector";
import Heading from "@components/common/heading";
import Text from "@components/common/text";
import Box from "@components/common/box";
import StyledMainContent from "./styled-main-content";

const MainContent = ({ t, currentLanguage, data, page, sort }) => {
  const countData = data.meta?.pagination?.total;
  const countPage = data.meta?.pagination?.pageCount;
  const [typeSortData, setTypeSortData] = useState(t("NameA-Z"));
  const [boolTypeSortData, setBoolTypeSortData] = useState(false);

  const pageLimit = countPage > 7 ? 7 : countPage;

  const arrayStart = [...Array(countPage).keys()].map(i => i+1)
    .filter(item => item % pageLimit === 0)
    .map((item,index) => item - index)

  const checkInterval = (page, min, max) => {
    if ((page >= min) && (page < max)) return min;

    if (page <= min && page < max) return 0;
    if (page >= min && !max) return min;
  }

  const getPaginationGroup = () => {
    let start = 0;
    for (let i = 0; i < arrayStart.length; i++) {
      if(checkInterval(page, arrayStart[i], arrayStart[i + 1])) {
        start = checkInterval(page, arrayStart[i], arrayStart[i + 1])
        break;
      } 
    }
    return new Array(countPage - start < pageLimit ? countPage - start + 1 : pageLimit).fill().map((_, idx) => start === 0 ? start + idx + 1 : start + idx);
  };
  
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
      <Heading
        level={2}
        className="heading-cards"
        textAlign="center"
        label={t("AllForms")}
      />
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
          getPaginationGroup={getPaginationGroup()}
          locale={currentLanguage}
          sort={sort}
          page={page}
        />
      </div>
    </StyledMainContent>
  );
};

export default MainContent;
