import globalColors from "../utils/global-colors";
const {
  white,
  gray,
  orangeMain
} = globalColors;

const Base = {
  main: {
    fontFamily: "sans-serif",
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