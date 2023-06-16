import {useState, useEffect} from "react";
import Cards from "../common/cards";
import {CategorySelector} from "@common/categorySelector";
import Text from "@common/text";
import StyledDesktopClientContent from "./styled-desktop-client-content";
import FilePopup from "./file-popup/file-popup";
import {SortSelector} from "@common/sortSelector";
import {useRouter} from "next/router";
import {Header} from "@common/header";
import {useTranslation} from "next-i18next";
const DesktopClientContent = (props) => {
    const {
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
    const {t} = useTranslation('common');
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
        <StyledDesktopClientContent
            isDark={(theme === 'theme-dark') || (theme === 'theme-contrast-dark')}
        >
            <Header handlerSetModal={handlerSetModal} handlerCardData={handlerCardData}/>
            <div className="box-doc-info-template">
                <div className="box-doc-categories">
                    <CategorySelector
                        typeSortData={typeSortData}
                        locale={currentLanguage}
                        className="form-control"
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
                    />
                </div>
            </div>
            <Cards
                data={data?.data}
                typeSortData={boolTypeSortData}
                currentLanguage={currentLanguage}
                page={page}
                sort={sort}
                handlerSetModal={handlerSetModal}
                handlerCardData={handlerCardData}
            />

            <FilePopup
                currentLanguage={currentLanguage}
                modalActive={modalActive}
                setModalActive={setModalActive}
                cardData={cardData}
            />
        </StyledDesktopClientContent>
    );
};

export default DesktopClientContent;
