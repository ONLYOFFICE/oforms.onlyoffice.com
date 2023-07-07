import React from "react";
import {useRouter} from "next/router";
import {HeaderBox, HeaderTitle, StyledHeader} from "./styledHeader";
import SearchContent from "../../screens/heading-content/search";
import LanguageSelector from "@common/languageSelector";
import {useTranslation} from "next-i18next";
import {Loup} from "@icons";

export const Header = ({handlerSetModal, handlerCardData}) => {
    const router = useRouter();
    const isDesktopClient = router.query.desktop;
    const {t} = useTranslation('common')

    if (isDesktopClient) {
        return (
            <StyledHeader isDesktopClient={isDesktopClient}>
                <HeaderTitle>{t('Templates')}</HeaderTitle>
                <HeaderBox className="header__box">
                    <SearchContent
                        handlerSetModal={handlerSetModal}
                        handlerCardData={handlerCardData}
                    />
                    <Loup style={{margin: '0 18px'}} />
                    <LanguageSelector/>
                </HeaderBox>
            </StyledHeader>
        )
    }
}