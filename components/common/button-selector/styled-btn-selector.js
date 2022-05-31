import styled from "styled-components";
import { Base } from "../../themes";

const StyledBtnSelector = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  align-items: center;
  justify-content: space-between;
  outline: none;
  position: relative;
  border-radius: 3px;
  box-sizing: border-box;
  border: 1px solid #aaaaaa;
  ${(props) => props.isActive && `border: 1px solid #FF6F3D;`}

  &:hover, &:active {
      border: 1px solid #FF6F3D;

      .placeholder{
        color: #FF6F3D;
        text-transform: uppercase;

        & ~ .indicatorContainer .indicatorSeparator{
          background-color:#FF6F3D;
        }
      }
      .chevronContainer path{
        fill: #FF6F3D;
      }
  }
  

  ${(props) => props.isScale && `width: 100%;`}

  .placeholder {
    display: block;
    font-weight: 600;
    font-size: 12px;
    line-height: 133%;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0;
    text-align: center;
    border: none;
    background: transparent;
    width: 100%;
    color: inherit;
    border-radius: 0;
    height: 100%;
    text-decoration: none;
    padding: 20px 0 19px;
    ${(props) => props.isActive && `color: #FF6F3D;`}
  }

  .indicatorContainer {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    cursor: pointer;

    &:hover{
      .indicatorSeparator{
        background-color:#FF6F3D;
      }
    }
  }

  .indicatorSeparator {
    align-self: stretch;
    background-color: rgb(204, 204, 204);
    ${(props) => props.isActive && `background-color: #FF6F3D;`}
    width: 1px;
    box-sizing: border-box;
  }

  .chevronContainer {
    padding: 15px 16px 10px;

    &.up {
      transform: rotate(180deg);
    }

    path {
      ${(props) => props.isActive && `fill: #FF6F3D;`}
    }
  }
`;

StyledBtnSelector.defaultProps = { theme: Base };

export default StyledBtnSelector;
