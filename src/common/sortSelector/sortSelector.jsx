import React, {useEffect, useMemo, useState} from "react";
import Selector, {Dropdown, DropdownItem} from "@components/selector";
import {useRouter} from "next/router";
import Link from "next/link";

export const SortSelector = (props) => {
    const {
        typeSortData,
        t,
        category,
    } = props;
    const [selectorValue, setSelectorValue] = useState()
    const router = useRouter();
    const theme = router.query.theme
    const isDesktopClient = router.query.desktop

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
            } else if(router.query.hasOwnProperty('category')) {
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

    return (
        <>
            <Selector
                label={t("SortBy")}
                value={t(selectorValue)}
            >
                <Dropdown
                    as="div"
                >
                    {isDesktopClient ?
                        <Link
                            href={getLinkForSort('asc')}
                            passHref
                        >
                            <DropdownItem
                                as="a"
                                isActive={typeSortData === t("NameA-Z")}
                                isDesktopClient
                            >
                                {t("NameA-Z")}
                            </DropdownItem>
                        </Link>
                        :
                        <Link
                            href={getLinkForSort('asc')}
                            passHref
                        >
                            <DropdownItem
                                as="a"
                            >
                                {t("NameA-Z")}
                            </DropdownItem>
                        </Link>
                    }
                    {isDesktopClient ?
                        <Link
                            href={getLinkForSort('desc')}
                            passHref
                        >
                            <DropdownItem
                                as="a"
                                isActive={typeSortData === t("NameZ-A")}
                                isDesktopClient
                            >
                                {t("NameZ-A")}
                            </DropdownItem>
                        </Link>
                        :
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
                    }
                </Dropdown>
            </Selector>
        </>
    )
}