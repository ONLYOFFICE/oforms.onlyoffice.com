import {useState, useEffect} from "react";

import Cards from "../../common/cards";
import Pagination from "@common/pagination";
import {CategorySelector} from "@common/categorySelector";
import NewCategorySelector from "@common/newCategorySelector"
import Heading from "@common/heading";
import Text from "@common/text";
import Box from "@common/box";
import StyledMainContent from "./styled-main-content";
import {SortSelector} from "@common/sortSelector";
import {useTranslation} from "next-i18next";
import { useRouter } from "next/router";
import axios from "axios";
import CategoryLanguageSelector from "@common/category-language-selector";

const MainContent = ({currentLanguage, data, page, sort, types, categories, compilations, categoriesMenu}) => {
    const {t} = useTranslation('common')
    const router = useRouter();
    const [formsData, setFormsData] = useState(data.data);
    const [countData, setCountData] = useState(data.meta?.pagination?.total);
    const [countPage, setCountPage] = useState(data.meta?.pagination?.pageCount);
    const [typeSortData, setTypeSortData] = useState(t("NameA-Z"));
    const [boolTypeSortData, setBoolTypeSortData] = useState(false);
    const [pageLimit, setPageLimit] = useState(countPage > 7 ? 7 : countPage);

    const [categorieKey, setCategorieKey] = useState(router.locale);
    const [categoriesData, setCategoriesData] = useState(categories);
    const [typesData, setTypesData] = useState(types);
    const [compilationsData, setCompilationsData] = useState(compilations);
    const [categoriesMenuName, setCategoriesMenuName] = useState({
        formsBranch: categoriesMenu?.data[0]?.attributes.name,
        formsType: categoriesMenu?.data[1]?.attributes.name,
        formsCompilations: categoriesMenu?.data[2]?.attributes.name
    });

    const fetchFormsData = async (locale) => {
        try {
            const formsResponse = await axios.post("/api/forms", {
                "locale": locale,
                "_sort": router.query._sort || "asc",
                "page": router.query.page || 1,
                "pageSize": router.query.pageSize || 9
            });

            setFormsData(formsResponse.data.forms.data);
            setCountData(formsResponse.data.forms.meta?.pagination?.total);
            setCountPage(formsResponse.data.forms.meta?.pagination?.page);
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        if (categorieKey === currentLanguage) {
            setFormsData(data.data); 
        } else {
            fetchFormsData(categorieKey);
        };
    }, [router.query._sort]);

    const arrayStart = [...Array(countPage).keys()].map(i => i + 1)
        .filter(item => item % pageLimit === 0)
        .map((item, index) => item - index)

    const checkInterval = (page, min, max) => {
        if ((page >= min) && (page < max)) return min;

        if (page <= min && page < max) return 0;
        if (page >= min && !max) return min;
    }

    const getPaginationGroup = () => {
        let start = 0;
        for (let i = 0; i < arrayStart.length; i++) {
            if (checkInterval(page, arrayStart[i], arrayStart[i + 1])) {
                start = checkInterval(page, arrayStart[i], arrayStart[i + 1])
                break;
            }
        }
        return new Array(countPage - start < pageLimit ? countPage - start + 1 : pageLimit).fill().map((_, idx) => start === 0 ? start + idx + 1 : start + idx);
    };

    const onChangeSelectTypeSort = (e) => {
        setTypeSortData(e.target.value);
    };

    const resizeHandler = () => {
        window.innerWidth < 425 ? setPageLimit(countPage > 4 ? 4 : countPage) : setPageLimit(countPage > 7 ? 7 : countPage)
    };

    useEffect(() => {
        resizeHandler();
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    });

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
                    <Box>
                        <CategorySelector
                            typeSortData={typeSortData}
                            onChangeSelectTypeSort={onChangeSelectTypeSort}
                            locale={currentLanguage}
                            className="form-control"
                            types={typesData}
                            categories={categoriesData}
                            compilations={compilationsData}
                            categorieKey={categorieKey}
                            categoriesMenuName={categoriesMenuName}
                        />
                        <CategoryLanguageSelector 
                            setCategoriesData={setCategoriesData}
                            setTypesData={setTypesData}
                            setCompilationsData={setCompilationsData}
                            categorieKey={categorieKey}
                            setCategorieKey={setCategorieKey}
                            setCategoriesMenuName={setCategoriesMenuName}
                            fetchFormsData={fetchFormsData}
                        />
                    </Box>
                    <Text className="box-doc-categories">
                        {" "}
                        {countData} {t("Documents")}
                    </Text>
                    <SortSelector
                        typeSortData={typeSortData}
                    />
                </Box>
                <Box className="box-cards-template" justifyContent="flex-end">
                    <Cards
                        data={formsData}
                        typeSortData={boolTypeSortData}
                        currentLanguage={currentLanguage}
                        page={page}
                        sort={sort}
                        categorieKey={categorieKey}
                    />
                </Box>
                {
                    countPage !== 1 &&
                    <Pagination
                        countPage={countPage}
                        getPaginationGroup={getPaginationGroup()}
                        locale={currentLanguage}
                        sort={sort}
                        page={page}
                    />
                }

            </div>
        </StyledMainContent>
    );
};

export default MainContent;
