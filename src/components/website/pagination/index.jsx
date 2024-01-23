import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { usePagination } from './usePagination';
import {
    PaginationButton,
    PaginationList,
    PaginationListItem,
    PaginationStyled,
} from './pagination.styled';
import { ChevronLeft, ChevronRight } from '@icons';

export const Pagination = ({ pageCount }) => {
    const {
        pages,
        currentPage,
        maxPagesToShow,
        isPrevButtonDisabled,
        isNextButtonDisabled,
        getPageLinkHref,
        onNextPage,
        onPrevPage,
    } = usePagination({ pageCount });
    return (
        <PaginationStyled>
            <PaginationButton
                onClick={onPrevPage}
                disabled={isPrevButtonDisabled}
            >
                <ChevronLeft size={24} />
            </PaginationButton>
            <PaginationList $maxPagesToShow={maxPagesToShow}>
                {
                    pages.map(page => (
                        <PaginationListItem
                            key={page}
                            className={(cn({ 'current': currentPage === page }))}
                        >
                            <Link
                                href={getPageLinkHref(page, 'forms')}
                                scroll={false}
                                passHref
                            >
                                <a>
                                    {page}
                                </a>
                            </Link>
                        </PaginationListItem>
                    ))
                }
            </PaginationList>
            <PaginationButton
                onClick={onNextPage}
                disabled={isNextButtonDisabled}
            >
                <ChevronRight size={24} />
            </PaginationButton>
        </PaginationStyled>
    );
};
