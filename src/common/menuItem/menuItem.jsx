import React from "react";
import PropTypes from "prop-types";
import {MenuItemIcon, MenuItemStyled, MenuItemTitle} from "@common/menuItem/menuItem.styled";
import Link from "next/link";
import {ChevronDown} from "@icons";
import classNames from "classnames";

const MenuItem = (props) => {
    const {
        icon = true,
        isOpen,
        href,
        title,
        locale,
        ...otherProps
    } = props;

    if (href !== undefined) {
        return (
            <Link
                href={href}
                passHref
                locale={locale}
            >
                <MenuItemStyled as="a" className="menu-item" {...otherProps}>
                    <MenuItemTitle className="menu-item__title">{title}</MenuItemTitle>
                    {
                        icon === true ?
                            <MenuItemIcon className="menu-item__icon">
                                <ChevronDown/>
                            </MenuItemIcon> : icon
                    }
                </MenuItemStyled>
            </Link>
        )
    }

    return (
        <MenuItemStyled className={classNames('menu-item', {'open': isOpen})} {...otherProps}>
            <MenuItemTitle className="menu-item__title">{title}</MenuItemTitle>
            {
                icon === true ?
                    <MenuItemIcon className="menu-item__icon">
                        <ChevronDown color="currentColor"/>
                    </MenuItemIcon> : icon
            }

        </MenuItemStyled>
    )
}

MenuItem.propTypes = {
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    locale: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    isOpen: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
}

export default MenuItem;