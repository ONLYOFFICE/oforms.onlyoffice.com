import React from "react";
import {useTheme} from "styled-components";
import {useRouter} from "next/router";
import {XClose} from "../../../icons";

export const CategorySelectorHeader = (props) => {
    const {
        Header,
        Label,
        Value,
        icon,
        label,
        value,
        onClear
    } = props;
    const theme = useTheme();
    const router = useRouter();
    const isDesktopClient = router.query.desktop;

    if (isDesktopClient) {
        return (
            <Header className="selector__header">
                <Label className="selector__label">{label}</Label>
                <Value className="selector__value">{value}</Value>
                {
                    value !== undefined ?
                        <XClose
                            className="selector__clear-icon"
                            onClick={onClear}
                            color={theme.colors.palette.iconNormal}
                            style={{cursor: 'pointer'}}
                        />
                        :
                        icon
                }
            </Header>
        )
    }

    return (
        <Header className="selector__header">
            <Label className="selector__label">{label}</Label>
            <Value className="selector__value">{value}</Value>
            {icon}
        </Header>
    )
}