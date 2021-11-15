import React from "react";
import PropTypes from "prop-types";
import StyledSnackbar from "./styled-snackbar";

const Snackbar = (props) => {
  return <StyledSnackbar {...props} />;
};

Snackbar.propTypes = {
  /* Show or hide snackbar */
  isVisible: PropTypes.bool,
  /* Set background-color */
  backgroundColor: PropTypes.string,
};

Snackbar.defaultProps = {
  backgroundColor: "rgba(249,249,249,0.95)",
};

export default Snackbar;
