import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const usePagination = ({ pageCount }) => {
    const router = useRouter();

    const currentPage = Number(router.query.page ?? 1);


    const getPages = () => {
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        const pages = [];
        for (let page = startPage; page <= endPage; page++) {
            pages.push(page);
        }

        return pages;
    };

    return {
        pages: getPages(),
    };
};
