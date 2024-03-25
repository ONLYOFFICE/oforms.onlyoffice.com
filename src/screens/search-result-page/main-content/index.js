import StyledMainContent from "./styled-main-content";
import Cards from "../../common/cards";
import Text from "@common/text";
import Box from "@common/box";
import CategorySelector from "@common/category-selector";
import SortSelector from "@common/sort-selector";

const MainContent = ({ t, currentLanguage, data, page, sort, types, categories, compilations }) => {
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
              t={t}
              types={types}
              categories={categories}
              compilations={compilations}
            />
          </div>
          <div className="box-doc-info">
            <Text className="box-doc-categories">
              {" "}
              {data?.data?.length > 0 ? data.data.length : data?.meta?.pagination?.total ? data === null : 0} {t("Documents")}
            </Text>
            <SortSelector t={t} sort={sort} />
          </div>
        </Box>
        <Box className="box-cards-template" justifyContent="flex-end">
          <Cards
            t={t}
            data={data}
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
