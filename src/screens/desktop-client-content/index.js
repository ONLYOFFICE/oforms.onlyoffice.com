import {useState, useEffect, useCallback} from "react";
import Cards from "../common/cards";
import NewCards from './cards'
import Header from './header'
import StyledDesktopClientContent from "./styled-desktop-client-content";
import FilePopup from "./file-popup/file-popup";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import CONFIG from "@config/config.json";

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
        queryDesktopClient,
        locale,
    } = props;
    const {t} = useTranslation('common');
    const [typeSortData, setTypeSortData] = useState(t("NameA-Z"));
    const [cardData, setCardData] = useState("");
    const router = useRouter();
    const theme = router.query.theme
    const [toTopButtonActive, setToTopButtonActive] = useState(false)
    const [isError, setIsError] = useState(false)

    const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";

    const [modalActive, setModalActive] = useState(false);

    const [isLoading, setIsLoading] = useState(false)
    const [forms, setForms] = useState(data)

    const handlerCardData = (_, cardData) => {
        setModalActive(true);
        setCardData(cardData.attributes);
    };

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

    const getContentHeight = useCallback(() => {
        if (document) {
            const target = document.body?.firstChild?.firstChild?.firstChild?.firstChild.childNodes[1]
            return target?.scrollHeight || 0
        }

        return 0
    }, [])

    const handleScroll = useCallback(() => {
        const scrollTop = document.body?.firstChild?.firstChild?.firstChild?.firstChild.childNodes[1].scrollTop;
        const scrollHeight = document.body?.firstChild?.firstChild?.firstChild?.firstChild.childNodes[1].scrollHeight;
        const clientHeight = document.body?.firstChild?.firstChild?.firstChild?.firstChild.childNodes[1].clientHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrollTop + clientHeight >= scrollHeight / 2 && scrollHeight >= 3000) setToTopButtonActive(true)
        else setToTopButtonActive(false)

        if (scrolledToBottom) {
            getForms();
        }
    }, [forms, isLoading, isError])

    const handleResize = () => {
        const contentHeight = getContentHeight() + 157;
        const screenHeight = document?.body.clientHeight;
        if (contentHeight + 30 <= screenHeight) {
            getForms()
        }
    }


    useEffect(() => {
        setForms(data)
    }, [data])

    useEffect(() => {
        handleResize()
    }, [isError, isLoading])

    const toTop = () => {
        document.body?.firstChild?.firstChild?.firstChild?.firstChild.childNodes[1].scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    const getForms = async (page) => {
        try {
            const nextPage = page ?? forms.meta.pagination.page + 1
            if (isLoading || nextPage > forms.meta.pagination.pageCount || isError) return
            setIsLoading(true)
            const formsRes = await fetch(
                `${CMSConfigAPI}/api/oforms/?sort=name_form:${sort}&pagination[pageSize]=32&pagination[page]=${nextPage}&populate=template_image&populate=file_oform&populate=card_prewiew&populate=categories&locale=${locale}`
            )
            const newForms = await formsRes.json()
            const result = {
                data: [...forms.data, ...newForms.data],
                meta: newForms.meta,
            }
            setForms(result)
            setIsLoading(false)
            return result;
        } catch (e) {
            setIsError(true)
            setIsLoading(false)
            return data;
        }
    }

    useEffect(() => {
        if (sort === "desc") {
            setTypeSortData(t("NameZ-A"));
        } else {
            setTypeSortData(t("NameA-Z"));
        }
        setIsError(false)
    }, [sort]);

    return (
        <StyledDesktopClientContent>
            <Header
                typeSortData={typeSortData}
                locale={currentLanguage}
                className="form-control"
                types={types}
                categories={categories}
                compilations={compilations}
                isCategoryPage={isCategoryPage}
                isDesktopClient
                header={header}
                categoryName={categoryName}
                queryDesktopClient={queryDesktopClient}
            />
            <NewCards
                topTop={toTop}
                items={forms?.data ?? []}
                onCardClick={handlerCardData}
                onClear={onClear}
                isDark={(theme === 'theme-dark') || (theme === 'theme-contrast-dark')}
                onScroll={handleScroll}
                toTopButtonActive={toTopButtonActive}
                isLoading={isLoading}
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
