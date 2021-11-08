import React from "react";
import PropTypes from "prop-types";
import Heading from "../../heading";
import { ReactSVG } from "react-svg";
import StyledLabel from "./styled-label";


const Label = ({ className, onClick, label, level, selected, ...rest }) => {
    return (
<StyledLabel
    onClick={onClick}
    >
      {label ?
        <span className="dropdownLabel">{label}</span>
      : null}
        <Heading 
            className="dropdownHead"{...rest}
            level={level}
            >{selected}</Heading>
        <span className="caret-down">
        <ReactSVG 
            className="cardPrice"
            src="/site-assets/icons/arrow-drop-down2.react.svg"
            wrapper="svg">
        </ReactSVG>

        </span>
</StyledLabel>
    );
};

Label.propTypes = {
    /** Image tab index */
    tabIndex: PropTypes.number,
    /** Accepts id */
    id: PropTypes.string,
    /** Accepts class */
    className: PropTypes.string,
  };
  
Label.defaultProps = {
    tabIndex: -1,
};
  
  export default Label;