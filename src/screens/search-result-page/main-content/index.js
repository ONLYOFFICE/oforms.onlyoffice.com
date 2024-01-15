import {useEffect} from "react";
import Cards from "../../common/cards";

import Text from "@common/text";
import Box from "@common/box";
import {CategorySelector} from "@common/categorySelectorNew";

import StyledMainContent from "./styled";
import {SortSelector} from "@common/sortSelector";
import {useTranslation} from "next-i18next";

const MainContent = ({
                         currentLanguage,
                         data,
                         page,
                         sort,
                         urlReqCategory,
                         types,
                         categories,
                         compilations
                     }) => {
    const {t} = useTranslation('common')
    const countData = data?.meta?.pagination?.total;

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
                        <SortSelector />
                    </div>
                </Box>
                <Box className="box-cards-template" justifyContent="flex-end">
                    <Cards
                        data={data?.data}
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
