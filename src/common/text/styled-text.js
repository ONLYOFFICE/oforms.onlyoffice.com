import styled, { css } from "styled-components";
import { Base } from "@components/themes";

const display = css`
  display: ${(props) =>
    props.isInline ? props.theme.text.display : props.display || "block"};
`;

const fontText = css`
  font-family: ${(props) => props.theme.text.fontFamily};
  font-size: ${(props) => props.fontSize || props.theme.text.fontSize};
  font-weight: ${(props) =>
    props.isBold ? "bold" : props.fontWeight || props.theme.text.fontWeight};
  font-style: ${(props) =>
    props.isItalic ? "italic" : props.fontStyle || props.theme.text.fontStyle};
`;

const trancate = css`
  ${(props) =>
    !props.truncate &&
    css`
      white-space: ${(props) => props.theme.text.whiteSpace};
      text-overflow: ${(props) => props.theme.text.textOverflow};
      overflow: ${(props) => props.theme.text.overflow};
    `}
`;

const hoverText = css`
  ${(props) =>
    props.isHoverText &&
    css`
      :hover {
        color: ${(props) => props.hoverColor || props.theme.text.hoverColor};
        text-transform: ${(props) =>
          props.hoverTextTransform || props.theme.text.hoverTextTransform};
        text-decoration: ${(props) =>
          props.hoverTextDecoration || props.theme.text.hoverTextDecoration};
        text-shadow: ${(props) =>
          props.hoverTextShadow || props.theme.text.hoverTextShadow};
        cursor: ${(props) => props.hoverCursor || props.theme.text.hoverCursor};
      }
    `};
`;

const StyledText = styled.span`
  ${display}
  height: ${(props) => props.height || props.theme.text.height};
  width: ${(props) => props.width || props.theme.text.width};
  padding: ${(props) => props.padding || props.theme.text.padding};
  margin: ${(props) => props.margin || props.theme.text.margin};
  color: ${(props) => props.color || props.theme.text.color};
  ${fontText}
  line-height: ${(props) => props.lineHeight || props.theme.text.lineHeight};
  text-align: ${(props) => props.textAlign || props.theme.text.textAlign};
  text-transform: ${(props) =>
    props.textTransform || props.theme.text.textTransform};
  text-decoration: ${(props) =>
    props.textDecoration || props.theme.text.textDecoration};
  text-shadow: ${(props) => props.textShadow || props.theme.text.textShadow};
  ${trancate}
  ${hoverText}    
    cursor: ${(props) => props.cursor || props.theme.text.cursor};
`;

StyledText.defaultProps = { theme: Base };

export default StyledText;
