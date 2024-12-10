import styled from "styled-components";
import { device } from "@utils/devices";

const StyledSearch = styled.div`
  box-sizing: border-box;
  padding: 0 40px;
  width: 100%;
  background-color: #333333;

  .search-wrapper {
    position: relative;
    margin: 0 auto;
    display: block;
    justify-content: space-between;
    max-width: 1120px;
  }

  .search-container {
    display: flex;
    align-items: center;
    padding: 16px 0 7px;
    border-bottom: 1px solid #666666;
    transition: border-color 0.3s;
    max-width: 1120px;
    width: 100%;

    &:not(.focus):hover {
      border-color: #808080;

      .search-icon {
        path {
          fill: #CCCCCC;
        }
      }

      .label {
        color: #E2E2E2;
      }
    }

    @media screen and ${device.mobile} {
      padding: 8px 0 7px;
    }
  }

  .search-title {
    ${props => props.locale === "ar" ? "border-right: 1px solid #AAAAAA;" : "border-left: 1px solid #AAAAAA;"}
    ${props => props.locale === "ar" ? "padding-right: 16px;" : "padding-left: 16px;"}
    font-size: 14px;
    font-weight: 600;
    line-height: 19px;
    color: #FFFFFF;
    white-space: nowrap;

    @media screen and ${device.tablet} {
      display: none;
    }
  }

  @media screen and ${device.mobile} {
    padding: 0 16px;
  }
`;

export default StyledSearch;
