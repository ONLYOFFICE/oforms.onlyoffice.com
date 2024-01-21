import React from 'react';
import Link from 'next/link';

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
    } = usePagination({ pageCount });
    return (
        <PaginationStyled>
            <PaginationButton><ChevronLeft size={24} /></PaginationButton>
            <PaginationList>
                {
                    pages.map(page => (
                        <PaginationListItem key={page}>
                            {/*<Link*/}
                            {/*    href={{}}*/}
                            {/*    scroll={false}*/}
                            {/*>*/}
                            {/*    {page}*/}
                            {/*</Link>*/}
                        </PaginationListItem>
                    ))
                }
            </PaginationList>
            <PaginationButton><ChevronRight size={24} /></PaginationButton>
        </PaginationStyled>
    );
};
