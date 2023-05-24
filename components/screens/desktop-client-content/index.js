import {useState, useEffect} from "react";

import Cards from "@components/screens/common/cards";
import { CategorySelector } from "@components/common/categorySelector";
import LanguageSelector from "@components/common/language-selector";
import SearchContent from "@components/screens/heading-content/search";
import Text from "@components/common/text";
import StyledDesktopClientContent from "./styled-desktop-client-content";
import FilePopup from "./file-popup/file-popup";
import {SortSelector} from "@components/common/sortSelector";
import {useRouter} from "next/router";
import {Header} from "@components/common/header";

const DesktopClientContent = (props) => {
    const {
        t,
        currentLanguage,
        data,
        page,
        sort,
        types,
        categories,
        compilations,
        isCategoryPage,
        header,
        categoryName,
        queryDesktopClient
    } = props;
    const countData = data?.meta?.pagination?.total;
    const [typeSortData, setTypeSortData] = useState(t("NameA-Z"));
    const [boolTypeSortData, setBoolTypeSortData] = useState(false);
    const [cardData, setCardData] = useState("");
    const router = useRouter();
    const theme = router.query.theme
    const isDesktopClient = router.query.desktop

    const [modalActive, setModalActive] = useState(false);
    const handlerSetModal = () => {
        setModalActive(true);
    };

    const handlerCardData = (cardData) => {
        setCardData(cardData);
    };

    useEffect(() => {
        if (sort === "desc") {
            setTypeSortData(t("NameZ-A"));
        } else {
            setTypeSortData(t("NameA-Z"));
        }
    }, [sort]);

    return (
        <StyledDesktopClientContent isDark={(theme === 'theme-dark') || (theme === 'theme-contrast-dark')}>
           <Header t={t} handlerSetModal={handlerSetModal} handlerCardData={handlerCardData} />
            <div className="box-doc-info-template">
                <div className="box-doc-categories">
                    <CategorySelector
                        typeSortData={typeSortData}
                        locale={currentLanguage}
                        className="form-control"
                        t={t}
                        types={types}
                        categories={categories}
                        compilations={compilations}
                        isCategoryPage={isCategoryPage}
                        isDesktopClient={isDesktopClient}
                        header={header}
                        categoryName={categoryName}
                        queryDesktopClient={queryDesktopClient}
                    />
                </div>
                <div className="box-doc-info">
                    <Text className="box-doc-categories">
                        {" "}
                        {countData} {t("Documents")}
                    </Text>
                    <SortSelector
                        typeSortData={typeSortData}
                        category={categoryName}
                        t={t}
                    />
                </div>
            </div>

            <Cards
                t={t}
                data={data?.data}
                typeSortData={boolTypeSortData}
                currentLanguage={currentLanguage}
                page={page}
                sort={sort}
                handlerSetModal={handlerSetModal}
                handlerCardData={handlerCardData}
            />

            <FilePopup
                t={t}
                currentLanguage={currentLanguage}
                modalActive={modalActive}
                setModalActive={setModalActive}
                cardData={cardData}
            />
        </StyledDesktopClientContent>
    );
};

export default DesktopClientContent;
