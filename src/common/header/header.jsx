import React from "react";
import {useRouter} from "next/router";
import {StyledHeader} from "./styledHeader";
import SearchContent from "@components/screens/heading-content/search";
import LanguageSelector from "../language-selector";

export const Header = ({ t, handlerSetModal, handlerCardData }) => {
    const router = useRouter();
    const isDesktopClient = router.query.desktop;

    if(isDesktopClient) {
        return (
            <StyledHeader isDesktopClient={isDesktopClient}>
                <SearchContent
                    t={t}
                    handlerSetModal={handlerSetModal}
                    handlerCardData={handlerCardData}
                />
                <LanguageSelector t={t}/>
            </StyledHeader>
        )
    }
}