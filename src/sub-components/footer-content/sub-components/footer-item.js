import React from "react";
import PropTypes from "prop-types";

import StyledFooterItem from "./styled-footer-item";
import Heading from "../../../../components/heading";

const FooterItem = ({
    dis,
    children,
    className,
    heading,
    ...rest
}) => {

    const [isOpen, setIsOpen] = React.useState(false);

    const onHandleClick = (e) => {
        e.preventDefault();
        window.innerWidth <= 1024 &&
        setIsOpen(!isOpen); 
    };

    const footerItemClassName = className ? `footer-item-${className}` : `footer-item`;

    return (
        <StyledFooterItem
            isOpen={isOpen}
            className={footerItemClassName}
        >
            <Heading
                className="footer-item-heading"
                level={6}
                onClick={dis && onHandleClick}
            >
                {heading}
            </Heading>
            <div className="footer-items-group">
                {children}
            </div>
        </StyledFooterItem>
    );
}

FooterItem.propTypes = {
    heading: PropTypes.string,
    className: PropTypes.string
}

export default FooterItem;