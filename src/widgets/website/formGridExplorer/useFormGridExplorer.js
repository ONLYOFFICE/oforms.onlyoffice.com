import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import getAllForms from '@lib/strapi/getForms';


export const useFormGridExplorer = ({ forms, categoryName }) => {
    const router = useRouter();
    const {
        t,
        i18n: { language },
    } = useTranslation('common');

    const [formsWithLoadMore, setFormsWithLoadMore] = useState(forms.data);
    const [isLoading, setIsLoading] = useState(false);

    const isCategoryPage = router.pathname === '/form/[category]';
    const totalCount = forms.meta?.pagination?.total;
    const page = Number(router.query.page ?? 1);

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

    const onLoadMore = async () => {
        const pageCount = forms.meta.pagination.pageCount;
        if (page + 1 > pageCount || isLoading) return;
        setIsLoading(true);

        const sort = router.query._sort ?? 'asc';

        const nextPageForms = await getAllForms(language === 'pt' ? 'pt-br' : language, page + 1, sort, 9);

        await router.replace(
            {
                pathname: router.pathname,
                query: {
                    page: page + 1,
                    category: router.query.category,
                    type: router.query.type,
                    compilation: router.query.compilation
                }
            },
            undefined,
            { shallow: true, scroll: false },
        );

        setFormsWithLoadMore(prevState => [...prevState, ...nextPageForms.data]);

        setIsLoading(false);
    };

    return {
        t,
        totalCount,
        isCategoryPage,
        formsWithLoadMore,
        getAddressForBreadCrumb,
        onLoadMore,
    };
};
