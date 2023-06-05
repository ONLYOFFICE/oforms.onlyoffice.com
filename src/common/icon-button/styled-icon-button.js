import styled from "styled-components";
import Base from "@components/themes/base";

const StyledIconButton = styled.div`
  width: ${(props) =>
    props.size
      ? Number.isInteger(props.size)
        ? Math.abs(parseInt(props.size)) + "px"
        : props.size
      : props.theme.iconButton.width};
  cursor: ${(props) =>
    props.isDisabled || !props.isClickable ? "default" : "pointer"};
  line-height: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background: ${(props) => props.background || "none"};

  &:active .user-click-color {
    path {
      fill: ${(props) => props.clickColor} !important;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:active) {
      cursor: ${(props) =>
        !props.isDisabled || props.isClickable ? "pointer" : "default"};
      .user-hover-color {
        path {
          fill: ${(props) => props.hoverColor} !important;
        }
      }
    }
  }

  .user-color {
    path {
      fill: ${(props) => props.color} !important;
    }
  }

  filter: ${(props) => (props.grayed ? "grayscale(1)" : "grayscale(0)")};
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      filter: ${(props) => (props.grayed ? "grayscale(0)" : "none")};
    }
  }
`;

StyledIconButton.defaultProps = { theme: Base };

export default StyledIconButton;
