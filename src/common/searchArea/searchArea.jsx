import React from "react";
import Input from "@components/input";
import {useRouter} from "next/router";
import {SearchAreaStyled} from "@common/searchArea/searchArea.styled";
import {Loup} from "@icons";

export const SearchArea = ({ clearValueSearch, valueSearch, callback, t, onEnterPress }) => {
    const router = useRouter();
    const isDesktopClient = router.query.desktop;

    return (
        <SearchAreaStyled>
            {t("FormSearch")}
            <Input
                value={valueSearch}
                onChange={callback}
                onClear={clearValueSearch}
                onKeyDown={onEnterPress}
                label={t("SearchIputPlaceholder")}
                icon={<Loup />}
                isClearable
            />
        </SearchAreaStyled>
    )
};

export default SearchArea;
