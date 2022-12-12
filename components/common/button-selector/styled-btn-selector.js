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
  cursor: pointer;
  ${(props) => props.isActive && `border: 1px solid #666;`}

  &:hover {
      border: 1px solid ${(props) => props.isActive ? `#666;` : `#FF6F3D;`};
      

      .placeholder{
        color: #FF6F3D;
        ${(props) => props.isActive && `color: #333;`}
        text-transform: uppercase;

        & ~ .indicatorContainer .indicatorSeparator{
          background-color:${(props) => props.isActive ? `#666;` : `#FF6F3D;`};;
        }
      }
      .chevronContainer path{
        fill: ${(props) => props.isActive ? `#666;` : `#FF6F3D;`};;
      }
  }
  

  ${(props) => props.isScale && `width: 100%;`}

  .placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    padding: 20px 10px 19px;
    ${(props) => props.isActive && `color: #333;`}
  }

  .indicatorContainer {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    cursor: pointer;

    &:hover{
      .indicatorSeparator{
        background-color:${(props) => props.isActive ? `#666;` : `#FF6F3D;`};;
      }
    }
  }

  .indicatorSeparator {
    align-self: stretch;
    background-color: ${(props) => props.isActive ? `#666;` : `rgb(204, 204, 204);`};
    width: 1px;
    box-sizing: border-box;
  }

  .chevronContainer {
    padding: 15px 16px 10px;

    &.up {
      transform: rotate(180deg);
    }

    path {
      fill: ${(props) => props.isActive && `#666;`}
    }
  }
`;

StyledBtnSelector.defaultProps = { theme: Base };

export default StyledBtnSelector;
