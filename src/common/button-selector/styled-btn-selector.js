import styled from "styled-components";
import { Base } from "@components/themes";
import { device } from "@components/utils/devices";

const StyledBtnSelector = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;

  .btn-selector-label {
    display: flex;
    border-radius: 3px;
    cursor: pointer;
    background-color: ${(props) => props.typeButton === "primary" ? "#FF6F3D" : props.typeButton === "secondary" ? "transparent" : "transparent"};
    ${props => props.typeButton === "secondary" && `border: 1px solid ${props.isActive ? '#666' : '#aaaaaa'}`};
    transition: background-color 0.3s;

    &:hover {
      ${(props) => 
        props.typeButton === "primary" ? 
          `background-color: ${`${props.isActive ? `#FF6F3D` : `#ff865c`}`};` : 
        props.typeButton === "secondary" ? `
          border-color: ${`${props.isActive ? `#333` : `#FF6F3D`}`};
      
          .placeholder {
            color: ${`${props.isActive ? `#333` : `#FF6F3D`}`};
          }

          .indicator-container {
            border-color: ${`${props.isActive ? `#666;` : `#FF6F3D`}`};
          }

          path {
            fill: ${`${props.isActive ? `#666` : `#FF6F3D`}`};
          }
        ` : null
      }
    }
  }

  .placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    font-weight: 700;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0;
    text-align: center;
    border: none;
    background: transparent;
    width: 100%;
    border-radius: 0;
    height: 100%;
    text-decoration: none;
    padding: 19px 24px;
    color: ${(props) => props.typeButton === "primary" ? "#fff" : props.typeButton === "secondary" ? `#333` : "inherit"};

    @media ${device.mobile} {
      padding: 15px 16px;
      font-weight: 600;
    }
  }

  .indicator-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${(props) => props.typeButton === "primary" ? "#fff" : props.typeButton === "secondary" ? `#666` : "#fff"};
    width: 56px;
    height: 56px;
    min-width: 56px;

    @media ${device.mobile} {
      width: 48px;
      height: 48px;
      min-width: 48px;
    }
  }

  .chevron-down {
    transform: ${(props) => props.isActive && `rotate(180deg)`};

    path {
      fill: ${(props) => props.typeButton === "primary" ? "#fff" : props.typeButton === "secondary" ? `#666}` : "#fff"};
    }
  }
`;

StyledBtnSelector.defaultProps = { theme: Base };

export default StyledBtnSelector;
