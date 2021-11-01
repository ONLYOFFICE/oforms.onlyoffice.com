import globalColors from "../utils/global-colors";
const { white, gray } = globalColors;

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
};

export default Base;