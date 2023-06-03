import React from "react";
import {useRouter} from "next/router";
import {StyledHeader} from "./styledHeader";
import SearchContent from "@components/screens/heading-content/search";
import LanguageSelector from "../language-selector";
import {useTranslation} from "next-i18next";

export const Header = ({handlerSetModal, handlerCardData}) => {
    const router = useRouter();
    const isDesktopClient = router.query.desktop;
    const { t } = useTranslation('common')

    if (isDesktopClient) {
        return (
            <StyledHeader isDesktopClient={isDesktopClient}>
                <SearchContent
                    handlerSetModal={handlerSetModal}
                    handlerCardData={handlerCardData}
                />
                <LanguageSelector/>
            </StyledHeader>
        )
    }
}