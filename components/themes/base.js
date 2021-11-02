import globalColors from "../utils/global-colors";
const {
  white,
  gray,
  grayMain,
  grayHover,
  orangeMain,
  orangeHover,
} = globalColors;

const Base = {
  main: {
    fontFamily: "sans-serif",
  },

  button: {
    textColor: white,
    textColorTransparentType: grayMain,
    textColorTransparentTypeHover: orangeMain,
    textColorSecondaryType: white,
    borderColorHover: orangeMain,
    backgroundColorPrimary: orangeMain,
    backgroundColorSecondary: grayMain,
    backgroundColorPrimaryHover: orangeHover,
    backgroundColorSecondaryHover: grayHover,

    borderTransparentType: `1px solid ${grayMain}`,
    borderRadius: "3px",

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    outline: "none",
    boxSizing: "border-box",
    fontWeight: "600",
    margin: "0",
    display: "inline-block",
    textAlign: "center",
    textDecoration: "none",
    topVerticalAlign: "text-top",
    middleVerticalAlign: "middle",
    bottomVerticalAlign: "text-bottom",
    lineHeight: "13px",
    textTransform: "uppercase",
    fontSize: "12px",
    transitionDuration: "0.3s",

    mobile: {
      height: "48px",
      width: "100%"
    }
  },

  text: {
    color: gray,
    /** */
    display: "inline-block",
    height: "auto",
    width: "auto",
    padding: "0",
    margin: "0",
    fontSize: "14px",
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: "21px",
    textAlign: "left",
    textTransform: "none",
    textDecoration: "none",
    textShadow: "none",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    cursor: "default",
    hoverColor: gray,
    hoverTextTransform: "none",
    hoverTextDecoration: "none",
    hoverTextShadow: "none",
    hoverCursor: "default",
  },

  header: {
    fontSize: ["48px", "40px", "32px", "24px", "18px", "14px", "14px"],
    lineHeight: ["74px", "53px", "38px", "32px", "24px", "19px", "19px"],
    fontWeight: 700,
  },
  
  externalLink: {
    color: orangeMain,
    textDecoration: "underline",
    cursor: "default",
    hoverColor: orangeMain,
    hoverTextTransform: "none",
    hoverTextDecoration: "none",
    hoverCursor: "pointer",
  },
};

export default Base;