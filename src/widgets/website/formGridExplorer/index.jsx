import React from 'react';

import { CategorySelector } from '@common/categorySelectorNew';
import { SortSelector } from '@common/sortSelector';
import { BreadCrumb } from '@components/website/breadCrumb';
import { FormGrid } from '@components/website/formGrid';

import { useFormGridExplorer } from './useFormGridExplorer';
import {
    FormGridExplorerBreadCrumbWrapper,
    FormGridExplorerContainer,
    FormGridExplorerFormsCount, FormGridExplorerLoadMoreButton,
    FormGridExplorerStyled,
    FormGridExplorerTitle,
    FormGridExplorerTopControls,
    FormGridExplorerTopControlsBox,
    FormGridWrapper,
} from './formGridExplorer.styled';
import Link from 'next/link';
import { Pagination } from '@components/website/pagination';

export const FormGridExplorer = (props) => {
    const {
        forms,
        categories,
        types,
        compilations,
        categoryName,
    } = props;
    const {
        t,
        isCategoryPage,
        totalCount,
        formsWithLoadMore,
        getAddressForBreadCrumb,
        onLoadMore,
    } = useFormGridExplorer({forms, categoryName});

    return (
        <FormGridExplorerStyled $isCategoryPage={isCategoryPage}>
            <FormGridExplorerContainer $isCategoryPage={isCategoryPage}>
                {
                    isCategoryPage &&
                    <FormGridExplorerBreadCrumbWrapper>
                        <BreadCrumb address={getAddressForBreadCrumb()} />
                    </FormGridExplorerBreadCrumbWrapper>
                }
                {
                    !isCategoryPage &&
                    <FormGridExplorerTitle>
                        {t('Form templates')}
                    </FormGridExplorerTitle>
                }
                <FormGridExplorerTopControls $isCategoryPage={isCategoryPage}>
                    <CategorySelector
                        types={types}
                        categories={categories}
                        compilations={compilations}
                        categoryName={categoryName}
                    />
                    <FormGridExplorerTopControlsBox>
                        <FormGridExplorerFormsCount>
                            {totalCount} {t("Documents")}
                        </FormGridExplorerFormsCount>
                        <SortSelector />
                        <Link href={"/?page=1"}>Page 1</Link>
                        <Link href={"/?page=2"}>Page 2</Link>
                    </FormGridExplorerTopControlsBox>
                </FormGridExplorerTopControls>
                <FormGridWrapper>
                    <FormGrid
                        forms={formsWithLoadMore}
                    />
                </FormGridWrapper>
                <FormGridExplorerLoadMoreButton
                    onClick={onLoadMore}
                >
                    {t('Load more')}
                </FormGridExplorerLoadMoreButton>
                <Pagination
                    pageCount={forms.meta.pagination.pageCount}
                />
            </FormGridExplorerContainer>
        </FormGridExplorerStyled>
    );
};
