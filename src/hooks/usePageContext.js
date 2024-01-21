import { useRouter } from 'next/router';

export const usePageContext = () => {
    const router = useRouter();
    const isDesktopClient = router.query.desktop === 'true';
    const isFormPage = router.route === '/[form]';
    const isFormSubmitPage = router.route === '/form-submit';
    const isInvert = isFormPage || isFormSubmitPage;

    const getCurrentPathWithoutQuery = () => {
    }

    return {
        isDesktopClient,
        isInvert,
    };
};
