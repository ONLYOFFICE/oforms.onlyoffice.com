import React from "react";
import {Header, HeaderLabel, HeaderIcon, HeaderValue} from '@components/selector'
import {useRouter} from "next/router";
import {XClose} from "@icons";
import {useTheme} from "styled-components";
import classNames from "classnames";

export const CategorySelectorHeader = (props) => {
    const {label, value, isOpen, onClear, onClick} = props;
    const router = useRouter()
    const isDesktopClient = router.query.desktop
    const theme = useTheme()

    if (isDesktopClient && value !== undefined) {
        return (
            <Header>
                <HeaderLabel onClick={onClick}>{label}</HeaderLabel>
                <HeaderValue onClick={onClick}>{value}</HeaderValue>
                <XClose
                    size="24px"
                    color={theme.colors.palette.iconNormal}
                    style={{cursor: 'pointer'}}
                    onClick={onClear}
                />
            </Header>
        )
    }

    return (
        <Header onClick={onClick}>
            <HeaderLabel>{label}</HeaderLabel>
            <HeaderValue>{value}</HeaderValue>
            <HeaderIcon className={classNames({open: isOpen})}/>
        </Header>
    )
}