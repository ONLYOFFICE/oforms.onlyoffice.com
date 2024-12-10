import styled from "styled-components";
import Section from "@components/common/section";
import { device } from "@utils/devices";

const StyledSearchResultContent = styled(Section)`
  padding: 40px 0 144px;
  background-color: #F5F5F5;

  .search-result-title {
    direction: initial;
    margin-bottom: 32px;
    text-align: center;
  }

  .search-result-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    @media screen and ${device.mobile} {
      justify-content: initial;
      flex-direction: column;
    }
  }

  .search-result-length {
    font-size: 14px;
    line-height: 22px;
    color: #808080;

    @media screen and ${device.mobile} {
      margin-bottom: 12px;
    }
  }

  .search-result-items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-bottom: 56px;

    @media screen and ${device.laptop} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and ${device.mobile} {
      grid-template-columns: repeat(1, 1fr);
      gap: 16px;
    }
  }

  .search-no-result-title {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 18px;
    line-height: 133%;
    letter-spacing: -0.02em;
    text-align: center;
  }

  .search-no-result-img {
    background-image: url("https://static-oforms.onlyoffice.com/icons/bg-errors.react.svg");
    background-size: contain;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    width: 100%;
    height: 340px;
  }

  @media screen and ${device.tablet} {
    padding: 40px 0 120px;
  }

  @media screen and ${device.mobile} {
    padding: 24px 0 80px;
  }
`;

export default StyledSearchResultContent;
