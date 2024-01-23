import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import getAllForms from '@lib/strapi/getForms';
import getFormsByCategory from '@lib/strapi/getFormsByCategory';
import { usePageContext } from 'src/hooks';


export const useFormGridExplorer = ({ forms, categoryName }) => {
    const router = useRouter();
    const {
        t,
        i18n: { language },
    } = useTranslation('common');

    const {
        getCurrentHref,
        getDynamicPageQuery,
        isCategoryPage,
    } = usePageContext();

    const [formsWithLoadMore, setFormsWithLoadMore] = useState(forms.data);
    const [isLoading, setIsLoading] = useState(false);

    const totalCount = forms.meta?.pagination?.total;
    const page = Number(router.query.page ?? 1);
    const pageCount = forms?.meta?.pagination?.pageCount;

    const isSearchPage = router.pathname === '/searchresult';
    const isPaginationVisible = !isSearchPage && pageCount > 1 && page <= pageCount;
    const isLoadMoreVisible = !isSearchPage && pageCount > 1 && page < pageCount;
    const isTitleVisible = !isCategoryPage && !isSearchPage;

    const getAddressForBreadCrumb = () => {
        if (!isCategoryPage) return [];

        const categoryHref = router.query.category ?? router.query.type ?? router.query.compilation;

        return [
            {
                href: categoryHref,
                name: categoryName,
            },
        ];
    };

    const getForms = async (page, pageSize, sort) => {
        const dynamicPageQueryEntries = Object.entries(getDynamicPageQuery())[0];

        if (dynamicPageQueryEntries && dynamicPageQueryEntries.length === 2 && isCategoryPage) {
            const routeName = dynamicPageQueryEntries[0];
            const categoryValue = dynamicPageQueryEntries[1];
            let categoryName;

            if (routeName === 'category') categoryName = 'categories';
            else if (routeName === 'compilation') categoryName = 'compilations';
            else if (routeName === 'type') categoryName = 'types';

            return await getFormsByCategory({
                page,
                pageSize,
                sort,
                categoryValue,
                categoryName,
                locale: language === 'pt' ? 'pt-br' : language,
            });
        }

        return await getAllForms(language === 'pt' ? 'pt-br' : language, page, sort, pageSize);
    };

    const onLoadMore = async () => {
        const pageCount = forms.meta.pagination.pageCount;
        if (page + 1 > pageCount || isLoading) return;
        setIsLoading(true);

        const sort = router.query._sort ?? 'asc';

        const nextPageForms = await getForms(page + 1, 9, sort);

        await router.replace(
            getCurrentHref({ page: page + 1 }),
            undefined,
            { shallow: true, scroll: false },
        );

        setFormsWithLoadMore(prevState => [...prevState, ...nextPageForms.data]);

        setIsLoading(false);
    };

    useEffect(() => {
        setFormsWithLoadMore(forms.data);
    }, [forms.data]);

    return {
        t,
        totalCount,
        isCategoryPage,
        isTitleVisible,
        formsWithLoadMore,
        pageCount,
        isPaginationVisible,
        isLoadMoreVisible,
        getAddressForBreadCrumb,
        onLoadMore,
    };
};
