import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

import {
    HeaderBox,
    HeaderInputWrapper,
    HeaderStyled,
    HeaderTitle,
} from './header.styled';
import CategorySelector from '@common/newCategorySelector';

import { LanguageSelector } from 'src/common/languageSelector';
import { SearchInput } from '@components/desktop/searchInput';
import { SortSelector } from '@common/sortSelector';

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
    const [inputActive, setInputActive] = useState(!!queryDesktopClient);
    const { t } = useTranslation('common');


    return (
        <HeaderStyled>
            <HeaderTitle>{t('Templates')}</HeaderTitle>
            <HeaderBox active={inputActive}>
                <CategorySelector
                    typeSortData={typeSortData}
                    className='form-control'
                    types={types}
                    categories={categories}
                    compilations={compilations}
                    isDesktopClient={true}
                    categoryName={categoryName}
                    queryDesktopClient={queryDesktopClient}
                />
                <HeaderInputWrapper>
                    <SearchInput />
                    <SortSelector />
                    <LanguageSelector />
                </HeaderInputWrapper>
            </HeaderBox>
        </HeaderStyled>
    );
};

export default Header;
