import globalColors from "../utils/global-colors";
const {
  white,
  gray,
  grayMain,
  graySecnodary,
  grayHover,
  grayLight,
  orangeMain,
  orangeHover
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
    whiteSpace: "break-spaces",
    textOverflow: "ellipsis",
    overflow: "hidden",
    cursor: "default",
    hoverColor: gray,
    hoverTextTransform: "none",
    hoverTextDecoration: "none",
    hoverTextShadow: "none",
    hoverCursor: "default",
  },

  iconButton: {
    width: "20px",
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

  textInput: {
    textColor: gray,
    textColorHover: grayHover,
    textColorSecondaryType: graySecnodary,
    textColorSecondaryTypeHover: gray,

    backgroundColor: "#fff",
    backgroundColorPrimaryHover: white,
    backgroundColorDisabled: "#F9F9F9",
    backgroundColorSuccess: "#F9FEEF",
    backgroundColorError: "#FFF7F7",

    border: "1px solid",
    borderRadius: "3px",
    borderColor: "#AAAAAA",
    borderColorHover: "#666666",
    borderColorDisabled: "#AAAAAA",
    borderColorSuccess: "#8BB825",
    borderColorError: "#CB0000",

    position: "absolute",
    display: "block",
    boxSizing: "border-box",
    boxShadow: "none",
    width: "100%",
    height: "56px",
    padding: "0 16px",
    margin: "0",
    overflow: "auto",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "22px",
    textAlign: "left",
    verticalAlign: "center",
    textDecoration: "none",
    textTransform: "none",
    textShadow: "none",
    outline: "none",

    placeholderColor: "#CCC",

    label: {
      color: "#AAAAAA",
      colorHover: gray,
      padding: "0 15px",
      left: "2px",
      top: "8px",
      fontSize: "12px",
    },

    media: {
      width: "100%",
      fontSize: "13px",
    },
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

  separator: {
    display: "flex",
    width: "1px",
    alignItems: "center",

    div: {
      backgroundColor: grayLight,

      height: "1px",
      flex: "1",
    },

    span: {
      padding: "0 12px",
    },
  },

  scrollbar: {
    backgroundColorVertical: "rgba(0, 0, 0, 0.1)",
    backgroundColorHorizontal: "rgba(0, 0, 0, 0.1)",
  },

  box: {
    background: "unset",
    border: "none",
    justifyContent: "start",
    alignItems: "center",
    flexWrap: "nowrap",
    flexDirection: "row",
    alignContent: "flex-start"
  },

};

export default Base;