import styled from "styled-components";
import { device } from "@utils/devices";

const StyledSearch = styled.div`
  box-sizing: border-box;
  padding: ${props => props.templateTertiary ? "40px 40px 0" : "0 40px"};
  width: 100%;
  background-color: ${props => props.templateSecondary || props.templateQuaternary ? "#F9F9F9" : props.templateTertiary ? "#F5F5F5" : "#333333"};

  .search-wrapper {
    position: relative;
    margin: 0 auto;
    display: ${props => props.templateTertiary ? "flex" : "block"};
    justify-content: space-between;
    max-width: 1120px;
  }

  .search-container {
    display: flex;
    align-items: center;
    padding: ${props => props.templateTertiary ? "0" : "16px 0 7px"};
    border-bottom: 1px solid ${props => props.templateQuaternary ? "#AAAAAA" : props.templateTertiary ? "transparent" : "#666666"};
    transition: border-color 0.3s;
    max-width: ${props => props.templateTertiary ? "340px" :"1120px"};
    width: ${props => props.templateTertiary ? "340px" :"100%"};

    &:not(.value):hover {
      border-color: ${props => props.templateQuaternary ? "#AAAAAA" : props.templateTertiary ? "transparent" : "#808080"};

      .search-icon {
        path {
          fill: ${props => props.templateTertiary || props.templateQuaternary ? "#666666" : "#CCCCCC"};
        }
      }

      .label {
        color: ${props => props.templateTertiary || props.templateQuaternary ? "#666666" : "#E2E2E2"};
      }
    }

    @media screen and ${device.mobile} {
      max-width: ${props => props.templateTertiary ? "224px" :"1120px"};
      padding: ${props => props.templateTertiary ? "0" : "8px 0 7px"};
    }
  }

  .search-input {
    border: ${props => props.templateTertiary ? "1px solid #AAAAAA" :"none"};
    border-radius: 3px;
    position: relative;
    width: 100%;
  }

  .text-input {
    .search-icon {
      left: 18px;
      width: 20px;
      height: 20px;

      path {
        fill: #AAAAAA;
        transition: fill 0.3s;
      }

      @media screen and ${device.tablet} {
        left: ${props => props.templateTertiary ? "12px" : ""};
      }

      @media screen and ${device.mobile} {
        left: 8px;
      }
    }

    .input {
      border: none;
      color: ${props => props.templateTertiary || props.templateQuaternary ? "#333333" : "#FFFFFF"};
      height: ${props => props.templateTertiary ? "48px" : "56px"};

      &.focus, &:focus {
        padding: ${props => props.templateTertiary ? "20px 48px 8px 48px" : "24px 48px 8px 48px"};
      }

      &:focus + .label, 
      &.focus + .label {
        top: ${props => props.templateTertiary ? "4px" : "8px"};
        @media screen and ${device.tablet} {
          top: 0;
        }
      }

      @media screen and ${device.tablet} {
        height: ${props => props.templateTertiary ? "38px" : "56px"};
        padding: ${props => props.templateTertiary ? "4px 8px 4px 40px" : ""};

        &.focus, &:focus {
          padding: ${props => props.templateTertiary ? "12px 48px 4px 40px" : "24px 48px 8px 48px"};
        }
      }

      @media screen and ${device.mobile} {
        padding: 16px 40px;
      }
    }

    .label {
      top: ${props => props.templateTertiary ? "13px" : "16px"};

      @media screen and ${device.tablet} {
        left: ${props => props.templateTertiary ? "40px" : ""};
        top: ${props => props.templateTertiary ? "8px" : "16px"};
      }

      @media screen and ${device.mobile} {
        left: 40px;
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 80%;
      }
    }

    .input-btn {
      @media screen and ${device.mobile} {
        ${props => props.locale === "ar" ? "left: 8px;" : "right: 8px;"}
      }
    }
  }

  .search-title {
    ${props => props.locale === "ar" ? "border-right: 1px solid #AAAAAA;" : "border-left: 1px solid #AAAAAA;"}
    ${props => props.locale === "ar" ? "padding-right: 16px;" : "padding-left: 16px;"}
    font-size: 14px;
    font-weight: 600;
    line-height: 19px;
    color: ${props => props.templateTertiary || props.templateQuaternary ? "#333333" : "#FFFFFF"};
    white-space: nowrap;
    display: ${props => props.templateTertiary ? "none" :"block"};

    @media screen and ${device.tablet} {
      display: none;
    }
  }

  .search-results {
    position: absolute;
    top: calc(100% + 4px);
    border-radius: 3px;
    padding: 8px 0;
    width: 100%;
    max-width: 544px;
    background-color: #FFFFFF;
    box-shadow: 0px 7px 25px 0px rgba(85, 85, 85, 0.15);
  }

  .search-results-label {
    padding: 8px 16px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #808080;
    text-transform: uppercase;
  }

  .search-results-item {
    position: relative;
    display: flex;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #444444;
    transition: color 0.3s, background-color 0.3s;

    a {
      padding: ${(props) => (props.locale === "ar" ? "8px 16px 8px 50px" : "8px 50px 8px 16px")};
      width: 100%;
    }

    &:hover {
      color: #FF6F3D;
      background-color: #F5F5F5;
    }
  }

  .search-results-btn {
    position: absolute;
    top: 50%;
    ${(props) => (props.locale === "ar" ? "left: 16px;" : "right: 16px;")}
    display: flex;
    border: none;
    padding: 0;
    background-color: transparent;
    transform: translateY(-50%);
    cursor: pointer;

    svg {
      width: 24px;
    }
  }

  .search-results-popular-item,
  .search-results-no-results {
    display: block;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #444444;

    &:hover {
      color: #FF6F3D;
      background-color: #F5F5F5;
    }
  }

  .search-results-popular-item {
    &:hover {
      color: #FF6F3D;
      background-color: #F5F5F5;
    }
  }

  .search-excerpt {
    color: #FF6F3D;
  }

  .back-btn {
    align-items: center;
    display: flex;
    gap: 8px;

    .back-btn-link {
      font-size: 13px;
      font-weight: 600;
      line-height: 17px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      @media screen and ${device.mobile} {
        display: none;
      }
    }
  }

  @media screen and ${device.mobile} {
    padding: ${props => props.templateTertiary ? "24px 16px 0" : "0 16px"};
  }
`;
export default StyledSearch;
