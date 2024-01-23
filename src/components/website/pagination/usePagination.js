import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { usePageContext } from 'src/hooks';

export const usePagination = ({ pageCount }) => {
    const router = useRouter();

    const { getCurrentHref } = usePageContext();

    const [maxPagesToShow, setMaxPagesToShow] = useState(7);

    const currentPage = Number(router.query.page ?? 1);
    const isNextButtonDisabled = currentPage >= pageCount;
    const isPrevButtonDisabled = currentPage === 1;

    const handleWindowWidth = () => {
        setMaxPagesToShow(window.innerWidth <= 500 ? 5 : 7)
    }

    useEffect(() => {
        handleWindowWidth()

        window.addEventListener('resize', handleWindowWidth)

        return () => window.removeEventListener('resize', handleWindowWidth)
    }, []);


    const getPages = () => {
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
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

    const getPageLinkHref = (page, hash) => {
        const href = page === 1 ? getCurrentHref() : getCurrentHref({ page });

        if (hash) {
            href.hash = hash;
        }

        return href;
    };

    const onNextPage = () => {
        if (isNextButtonDisabled) return;

        router.push(getPageLinkHref(currentPage + 1), undefined, { scroll: false });
    };

    const onPrevPage = () => {
        if (isPrevButtonDisabled) return;

        router.push(getPageLinkHref(currentPage - 1), undefined, { scroll: false });
    };

    return {
        pages: getPages(),
        maxPagesToShow,
        isNextButtonDisabled,
        isPrevButtonDisabled,
        getPageLinkHref,
        onNextPage,
        onPrevPage,
        currentPage,
    };
};
