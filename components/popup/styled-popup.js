import styled, { css } from "styled-components";
import { Base } from "../themes";

const StyledPopup = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: 0.1s;
    z-index: 1001;

    ${(props) =>
    props.active && css`
      opacity: 1;
      pointer-events: all;
      `
  }

    .popup-content {
        padding: 88px 96px;
        background: #FFFFFF;
        box-shadow: 0px 20px 50px rgba(85, 85, 85, 0.15);
        border-radius: 5px;
        position:relative;
    }
`;

StyledPopup.defaultProps = { theme: Base };

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;

  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  cursor: pointer;
  right: 22px;
  top: 22px;

  &:before,
  &:after {
    content: '';
    background-color: #444444;
    position: absolute;
    width: 100%;
    height: 2px;
    transform: rotate(45deg);
    border-radius: 1px;
    left: 0;
    top: 11px;
  }

  &:after {
    transform: rotate(-45deg);
  }
`;
CloseButton.defaultProps = { theme: Base };

export { CloseButton, StyledPopup };