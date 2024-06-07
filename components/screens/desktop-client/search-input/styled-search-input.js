import styled from "styled-components";
import { device } from "@utils/devices";

const StyledSearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  margin: 0 16px;

  @media screen and ${device.tablet} {
    justify-content: end;
    width: 100%;
  }
  
  &.open {
    border-color: #D8DADC;

    @media screen and (max-width: 592px) {
      margin: 0 16px 0 0;
    }

    .search-input {
      width: 282px;

      @media screen and ${device.tablet} {
        width: 100%;
      }
    }
  }

  .search-input-btn {
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;

    svg {
      display: flex;

      path {
        fill: ${props =>
          props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
          props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
          "rgba(0, 0, 0, 0.8)"
        };
        transition: stroke 0.3s;
      }
    }
  }

  .cross-btn {
    display: none;
    position: absolute;
    right: 0;

    svg {
      path {
        stroke: ${props =>
          props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
          props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
          props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
          "#444444"
        };
      }
    }

    &:hover {
      svg {
        path {
          stroke: ${props =>
            props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "#BBBBBB" :
            "#7A7A7A"
          };
        }
      }
    }

    &:active {
      svg {
        path {
          stroke: ${props =>
            props.theme === "theme-dark" ? "#F1F1F1" :
            props.theme === "theme-contrast-dark" ? "#FFFFFF" : 
            "#444444"
          };
        }
      }
    }

    &.show {
      display: block;
    }
  }

  .search-input {
    border: none;
    padding: 0;
    font-size: 14px;
    line-height: 21px;
    color: ${props =>
      props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
      props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
      "#444444"
    };
    width: 0;
    height: 24px;
    background-color: transparent;
    outline: none;
    transition: width 0.3s;

    &.searchresult {
      transition: initial;

      @media screen and (max-width: 592px) {
        transition: width 0.3s;
      }
    }

    &::placeholder {
      color: #A5A5A5;
    }
  }
`
export default StyledSearchInput;