import React from 'react';

import { CategorySelector } from '@common/categorySelectorNew';
import { SortSelector } from '@common/sortSelector';
import { BreadCrumb } from '@components/website/breadCrumb';
import { FormGrid } from '@components/website/formGrid';

import { useFormGridExplorer } from './useFormGridExplorer';
import {
    FormGridExplorerBreadCrumbWrapper,
    FormGridExplorerContainer,
    FormGridExplorerFormsCount,
    FormGridExplorerLoadMoreButton,
    FormGridExplorerStyled,
    FormGridExplorerTitle,
    FormGridExplorerTopControls,
    FormGridExplorerTopControlsBox,
    PaginationWrapper,
} from './formGridExplorer.styled';
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
        isLoadMoreVisible,
        isPaginationVisible,
        isTitleVisible,
        totalCount,
        formsWithLoadMore,
        pageCount,
        getAddressForBreadCrumb,
        onLoadMore,
    } = useFormGridExplorer({ forms, categoryName });

    return (
        <FormGridExplorerStyled $isCategoryPage={isCategoryPage} id="forms">
            <FormGridExplorerContainer $isCategoryPage={isCategoryPage}>
                {
                    isCategoryPage &&
                    <FormGridExplorerBreadCrumbWrapper>
                        <BreadCrumb address={getAddressForBreadCrumb()} />
                    </FormGridExplorerBreadCrumbWrapper>
                }
                {
                    isTitleVisible &&
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
                            {totalCount} {t('Documents')}
                        </FormGridExplorerFormsCount>
                        <SortSelector />
                    </FormGridExplorerTopControlsBox>
                </FormGridExplorerTopControls>

                <FormGrid
                    forms={formsWithLoadMore}
                />

                {
                    isLoadMoreVisible &&
                    <FormGridExplorerLoadMoreButton
                        onClick={onLoadMore}
                    >
                        {t('Load more')}
                    </FormGridExplorerLoadMoreButton>
                }

                {
                    isPaginationVisible &&
                    <PaginationWrapper>
                        <Pagination
                            pageCount={pageCount}
                        />
                    </PaginationWrapper>
                }
            </FormGridExplorerContainer>
        </FormGridExplorerStyled>
    );
};
