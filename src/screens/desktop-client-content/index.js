import {useState, useEffect} from "react";
import Cards from "../common/cards";
import Header from '../common/header'
import StyledDesktopClientContent from "./styled-desktop-client-content";
import FilePopup from "./file-popup/file-popup";
import {useRouter} from "next/router";
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
    const isDesktopClient = router.query.desktop === 'true'

    const [modalActive, setModalActive] = useState(false);
    const [inputActive, setInputActive] = useState(false)
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

    const onClear = () => {
        if (theme) {
            router.push({
                pathname: '/',
                query: {
                    desktop: true,
                    theme,
                }
            })
        } else {
            router.push({
                pathname: '/',
                query: {
                    desktop: true,
                }
            })
        }
    }

    return (
        <StyledDesktopClientContent
            isDark={(theme === 'theme-dark') || (theme === 'theme-contrast-dark')}
        >
            <Header
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

    )
}

export default DesktopClientContent;
