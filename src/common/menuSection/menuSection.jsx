import React from "react";
import PropTypes from "prop-types";
import {
    MenuSectionBody,
    MenuSectionHeader,
    MenuSectionHeaderItem,
    MenuSectionStyled
} from "@common/menuSection/menuSection.styled";

const MenuSection = (props) => {
    const {
        title,
        prefix,
        postfix,
        children
    } = props;

    return (
        <MenuSectionStyled className="menu-section">
            <MenuSectionHeader className="menu-section__header">
                <MenuSectionHeaderItem className="menu-section__prefix">{prefix}</MenuSectionHeaderItem>
                <MenuSectionHeaderItem className="menu-section__title">{title}</MenuSectionHeaderItem>
                <MenuSectionHeaderItem className="menu-section__postfix">{postfix}</MenuSectionHeaderItem>
            </MenuSectionHeader>
            <MenuSectionBody className="menu-section__body">
                {children}
            </MenuSectionBody>
        </MenuSectionStyled>
    )
}

MenuSection.propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    prefix: PropTypes.element,
    postfix: PropTypes.element,
    children: PropTypes.element,
}

export default MenuSection;