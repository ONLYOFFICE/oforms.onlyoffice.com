import styled from "styled-components";
import { device } from "@utils/devices";

const StyledSearchInput = styled.div`
  box-sizing: border-box;
  position: ${props => !props.isMainPage && "relative"};
  width: 100%;

  .text-input {
    .search-icon {
      ${(props) => props.locale === "ar" ? `right: ${props.isMainPage ? "18px" : "12px"};` : `left: ${props.isMainPage ? "18px" : "12px"};`}
      width: 20px;
      height: 20px;

      path {
        fill: ${props => !props.isMainPage && "#808080"};
      }

      @media screen and ${device.mobile} {
        right: ${props => props.isMainPage && props.locale === "ar" && "10px"};
        left: ${props => props.isMainPage && props.locale !== "ar" && "10px"};
      }
    }

    .input {
      border: ${props => props.isMainPage && "none"};
      padding: ${props => !props.isMainPage && "12px 44px"};
      color: ${props => props.isMainPage ? "#FFFFFF" : "#333333"};
      height: ${props => props.isMainPage ? "56px" : "48px"};
      background-color: ${props => !props.isMainPage && "#F9F9F9"};
      transition: ${props => !props.isMainPage && "border-color 0.3s, background-color 0.3s"};

      &.focus,
      &.has-value {
        border-color: ${props => !props.isMainPage && "#666666"};
        padding: ${props => !props.isMainPage && "12px 44px"};
        background-color: ${props => !props.isMainPage && "#FFFFFF"};

        ~ .search-icon {
          path {
            fill: ${props => !props.isMainPage && "#444444"};
          }
        }

        ~ .label {
          top: ${props => props.isMainPage && "8px"};
          font-size: ${props => props.isMainPage && "12px"};
          line-height: ${props => props.isMainPage && "16px"};
          color: ${props => props.isMainPage && "#AAAAAA"};
        }

        @media screen and ${device.tablet} {
          padding: ${props => !props.isMainPage && "8px 40px"};
        }

        @media screen and ${device.mobile} {
          padding: ${props => props.isMainPage && "24px 40px 8px"};
        }
      }

      &:hover {
        border-color: ${props => !props.isMainPage && "#808080"};

        ~ .search-icon {
          path {
            fill: ${props => !props.isMainPage && "#666666"};
          }
        }
      }

      @media screen and ${device.tablet} {
        height: ${props => props.isMainPage ? "56px" : "38px"};
        padding: ${props => !props.isMainPage && "8px 40px"};
      }

      @media screen and ${device.mobile} {
        padding: ${props => props.isMainPage && "16px 40px"};
      }
    }

    .label {
      top: ${props => props.isMainPage ? "16px" : "13px"};

      @media screen and ${device.tablet} {
        left: ${props => !props.isMainPage && "40px"};
        top: ${props => props.isMainPage ? "16px" : "8px"};
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
      path {
        fill: ${props => props.isMainPage ? "#CCCCCC" : "#666666"};
      }

      @media screen and ${device.mobile} {
        ${props => props.locale === "ar" ? "left: 8px;" : "right: 8px;"}
      }
    }
  }

  .search-results {
    position: absolute;
    top: calc(100% + 4px);
    border: ${props => !props.isMainPage && "1px solid #666666"};
    border-radius: 3px;
    padding: 8px 0;
    width: 100%;
    max-width: 544px;
    background-color: #FFFFFF;
    box-shadow: 0px 7px 25px 0px rgba(85, 85, 85, 0.15);
    z-index: 1;
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
  }

  .search-results-popular-item {
    transition: color 0.3s, background-color 0.3s;

    &:hover {
      color: #FF6F3D;
      background-color: #F5F5F5;
    }
  }

  .search-excerpt {
    color: #FF6F3D;
  }
`;

export default StyledSearchInput;
