import { useRouter } from 'next/router';

import { dynamicRoutes } from '@utils/constants';

export const usePageContext = () => {
    const router = useRouter();

    const isDesktopClient = router.query.desktop === 'true';

    const getIsCategoryPage = () => {
        const currentRoute = router.route;

        for (const [, categoryRoute] of Object.entries(dynamicRoutes.form)) {
            if (categoryRoute === currentRoute) return true;
        }

        return false;
    };

    const getIsInvert = () => {
        const isFormPage = router.route === '/[form]';
        const isFormSubmitPage = router.route === '/form-submit';

        return isFormPage || isFormSubmitPage;
    };

    const getDynamicPageQuery = () => {
        const route = router.route;
        const dynamicPageQuery = {};

        // add new a case if you have a new dynamic route
        switch (route) {
            case dynamicRoutes.oneForm:
                dynamicPageQuery.form = router.query.form;
                break;
            case dynamicRoutes.form.categories:
                dynamicPageQuery.category = router.query.category;
                break;
            case dynamicRoutes.form.compilations:
                dynamicPageQuery.compilation = router.query.compilation;
                break;
            case dynamicRoutes.form.types:
                dynamicPageQuery.type = router.query.type;
                break;
        }

        return dynamicPageQuery;
    };

    const getCurrentHref = (query = {}) => {
        const dynamicPageQuery = getDynamicPageQuery();

        if (isDesktopClient && router.query.theme) {
            dynamicPageQuery.theme = router.query.theme;
        }

        if (router.query._sort) {
            dynamicPageQuery._sort = router.query._sort;
        }

        if (router.query.query) {
            dynamicPageQuery.query = router.query.query;
        }

        const combinedQuery = { ...dynamicPageQuery, ...query };
        const resultQuery = {};

        for (const key in combinedQuery) {
            if (combinedQuery[key] === null) continue;

            resultQuery[key] = combinedQuery[key];
        }

        return {
            pathname: router.pathname,
            query: resultQuery,
        };
    };

    return {
        isDesktopClient,
        isInvert: getIsInvert(),
        isCategoryPage: getIsCategoryPage(),
        getCurrentHref,
        getDynamicPageQuery,
    };
};
