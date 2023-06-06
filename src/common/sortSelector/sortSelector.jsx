import React, {useEffect, useMemo, useState} from "react";
import Selector, {Dropdown, DropdownItem} from "@components/selector";
import {useRouter} from "next/router";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {SelectorDefaultLabel} from "@components/selector/selectorDefaultElements";
import {SortAsc, SortDesc} from "@icons";
import {SortSelectorHeader, SortSelectorIcon} from "@common/sortSelector/styledSortSelector";

export const SortSelector = (props) => {
    const {
        typeSortData,
        category,
    } = props;
    const [selectorValue, setSelectorValue] = useState()
    const router = useRouter();
    const theme = router.query.theme
    const isDesktopClient = router.query.desktop
    const {t} = useTranslation('common')
    const sort = router.query._sort || 'ASC'

    const onSort = () => {
        router.push(getLinkForSort(sort === 'ASC' ? 'desc' : 'ASC'))
    }

    const appTheme = useMemo(() => {
        if (theme && isDesktopClient) return theme
    }, [theme, isDesktopClient])

    const getLinkForSort = (key) => {
        const result = {
            pathname: '/',
            query: {
                _sort: key
            }
        }

        if (router.pathname === '/searchresult') {
            result.pathname = '/searchresult'
            result.query.query = router.query.query
        }

        if (category !== undefined) {
            if (router.query.hasOwnProperty('compilation')) {
                result.pathname = `/form/compilations/${router.query.compilation}`
            } else if (router.query.hasOwnProperty('type')) {
                result.pathname = `/form/types/${router.query.type}`
            } else if (router.query.hasOwnProperty('category')) {
                result.pathname = `/form/${router.query.category}`
            }
        }

        if (isDesktopClient) {
            result.query.desktop = true
        }

        if (appTheme) {
            result.query.theme = appTheme
        }

        return result;
    }

    useEffect(() => {
        if (typeSortData) {
            setSelectorValue(typeSortData)
        }
    }, [typeSortData])

    if (isDesktopClient) {
        return (
            <SortSelectorHeader>
                <SelectorDefaultLabel>{t("SortBy")}</SelectorDefaultLabel>
                <SortSelectorIcon onClick={onSort}>
                    {
                        sort === 'ASC' ? <SortAsc size={24}/> : <SortDesc size={24}/>
                    }
                </SortSelectorIcon>
            </SortSelectorHeader>
        )
    }

    return (
        <>
            <Selector
                label={t("SortBy")}
                value={t(selectorValue)}
            >
                <Dropdown
                    as="div"
                >
                    <Link
                        href={getLinkForSort('ASC')}
                        passHref
                    >
                        <DropdownItem
                            as="a"
                        >
                            {t("NameA-Z")}
                        </DropdownItem>
                    </Link>
                    <Link
                        href={getLinkForSort('desc')}
                        passHref
                    >
                        <DropdownItem
                            as="a"
                        >
                            {t("NameZ-A")}
                        </DropdownItem>
                    </Link>
                </Dropdown>
            </Selector>
        </>
    )
}