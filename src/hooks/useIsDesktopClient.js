import { useRouter } from 'next/router';

export const useIsDesktopClient = () => {
    const router = useRouter();
    const isDesktopClient = router.query.desktop === 'true';

    return {
        isDesktopClient,
    }
};
