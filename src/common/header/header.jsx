import React from "react";
import {useRouter} from "next/router";
import {HeaderBox, HeaderTitle, StyledHeader} from "./styledHeader";
import SearchContent from "../../screens/heading-content/search";
import LanguageSelector from "@common/languageSelector";
import {useTranslation} from "next-i18next";

export const Header = ({handlerSetModal, handlerCardData}) => {
    const router = useRouter();
    const isDesktopClient = router.query.desktop;
    const { t } = useTranslation('common')

    if (isDesktopClient) {
        return (
            <StyledHeader isDesktopClient={isDesktopClient}>
                <HeaderTitle>{t('Templates')}</HeaderTitle>
                <HeaderBox>
                    <SearchContent
                        handlerSetModal={handlerSetModal}
                        handlerCardData={handlerCardData}
                    />
                    <LanguageSelector/>
                </HeaderBox>
            </StyledHeader>
        )
    }
}