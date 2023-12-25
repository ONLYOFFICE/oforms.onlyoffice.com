import React from "react";
import Input from "@components/input";
import {useRouter} from "next/router";
import {SearchAreaDesc, SearchAreaStyled} from "@common/searchArea/searchArea.styled";
import {Loup} from "@icons";
import {useTranslation} from "next-i18next";

export const SearchArea = ({ clearValueSearch, valueSearch, callback, onEnterPress }) => {
    const router = useRouter();
    const isDesktopClient = router.query.desktop;
    const { t } = useTranslation('common')

    const onSubmit = (e) => {
        e.preventDefault()
        onEnterPress && onEnterPress()
    }

    return (
        <SearchAreaStyled isDesktopClient={isDesktopClient} className="search-area">
            <SearchAreaDesc className="search-area__desc">
                {t("FormSearch")}
            </SearchAreaDesc>
            <form onSubmit={onSubmit}>
                <Input
                    value={valueSearch}
                    onChange={callback}
                    onClear={clearValueSearch}
                    label={t("SearchIputPlaceholder")}
                    icon={!isDesktopClient ? <Loup className="loup-icon" /> : undefined}
                    isClearable
                    className="search-area__input"
                />
            </form>
        </SearchAreaStyled>
    )
};

export default SearchArea;
