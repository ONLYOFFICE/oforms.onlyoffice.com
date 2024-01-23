export const CAROUSEL_COOKIE = "onlyoffice_carousel_cookie";
export const FOOTER_FORM_URL = "https://www.onlyoffice.com/post.ashx";
export const localStorageCarousel = "arrayCaroselClientSideItemsOforms";

// add a new dynamic route here if you have one
export const dynamicRoutes = {
    form: {
        categories: '/form/[category]',
        types: '/form/types/[type]',
        compilations: '/form/compilations/[compilation]'
    },
    oneForm: '/[form]'
}
