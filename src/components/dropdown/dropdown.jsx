import RcDropdown from 'rc-dropdown';
import React from 'react';
import PropTypes from "prop-types";
import {DropdownGlobalStyles, DropdownWrapper} from "./dropdown.styled";
import classNames from "classnames";

const Dropdown = (props) => {
    const {
        overlay,
        trigger = 'hover',
        visible,
        onVisibleChange,
        className,
        placement,
        defaultVisible,
        getPopupContainer,
        children,
        prefixCls = 'dropdown-component__overlay',
        transitionName,
        ...otherProps
    } = props
    return (
        <DropdownWrapper
            className={classNames('dropdown-component', className)}
            {...otherProps}
        >
            <RcDropdown
                visible={visible}
                trigger={[trigger]}
                overlay={overlay}
                onVisibleChange={onVisibleChange}
                placement={placement}
                prefixCls={prefixCls}
                defaultVisible={defaultVisible}
                minOverlayWidthMatchTrigger={true}
                getPopupContainer={getPopupContainer}
                transitionName={transitionName}
            >{children}
            </RcDropdown>
            <DropdownGlobalStyles />
        </DropdownWrapper>
    )
}

export default Dropdown;


Dropdown.propTypes = {
    overlay: PropTypes.element.isRequired,
    trigger: PropTypes.oneOf(['hover', 'click']),
    onVisibleChange: PropTypes.func,
    visible: PropTypes.bool,
    defaultVisible: PropTypes.bool,
    className: PropTypes.string,
    placement: PropTypes.oneOf(['top', 'topCenter', 'topRight', 'bottomLeft', 'bottom', 'bottomRight']),
    getPopupContainer: PropTypes.func,
    children: PropTypes.element,
    prefixCls: PropTypes.string,
    transitionName: PropTypes.string,
}