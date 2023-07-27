import React, {useState} from "react";
import {
    HeaderBox,
    HeaderForm,
    HeaderInput,
    HeaderInputWrapper,
    HeaderStyled,
    HeaderTitle
} from "./header.styled";
import CategorySelector from "@common/newCategorySelector";
import LanguageSelector from "@common/languageSelector";
import {SortSelector} from "@common/sortSelector";
import {Loup, XClose} from "@icons";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

const Header = (props) => {
    const {
        typeSortData,
        locale,
        category,
        types,
        categories,
        compilations,
        categoryName,
        queryDesktopClient,
    } = props;
    const [inputActive, setInputActive] = useState(!!queryDesktopClient)
    const [value, setValue] = useState(queryDesktopClient ?? '')
    const router = useRouter()
    const theme = router.query.theme ?? 'theme-classic'
    const {t} = useTranslation('common');

    const onSubmit = (e) => {
        e.preventDefault()
        if(value.trim()) {
            router.push({
                pathname: '/searchresult',
                query: {
                    desktop: true,
                    query: value.trim(),
                    theme
                }
            })
        } else onClear()
    }

    const onClear = () => {
        setValue('')
        setInputActive(false)
        router.push({
            pathname: '/',
            query: {
                desktop: true,
                theme
            }
        })
    }

    return (
        <HeaderStyled>
            <HeaderTitle>Templates</HeaderTitle>
            <HeaderBox active={inputActive}>
                <CategorySelector
                    typeSortData={typeSortData}
                    className="form-control"
                    types={types}
                    categories={categories}
                    compilations={compilations}
                    isDesktopClient={true}
                    categoryName={categoryName}
                    queryDesktopClient={queryDesktopClient}
                />
                <HeaderInputWrapper>
                    <HeaderForm onSubmit={onSubmit} active={inputActive}>
                        <Loup size="24px" onClick={() => setInputActive(prevState => !prevState)} className="search-icon" />
                        {
                            <HeaderInput
                                active={inputActive}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder={t('Search')}
                            />
                        }
                        {
                            inputActive && value.trim().length !== 0 && <XClose onClick={onClear} size="30px" className="clear-icon" />
                        }
                    </HeaderForm>
                    <SortSelector
                        typeSortData={typeSortData}
                        category={categoryName}
                    />
                    <LanguageSelector />
                </HeaderInputWrapper>
            </HeaderBox>
        </HeaderStyled>
    )
}

export default Header;
