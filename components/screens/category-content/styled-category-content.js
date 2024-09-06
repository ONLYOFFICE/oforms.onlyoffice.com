import styled from "styled-components";
import Section from "@components/common/section";
import { device } from "@utils/devices";

const StyledCategoryContent = styled(Section)`
  padding: 56px 0 144px;
  background-color: #F5F5F5;

  .category-nav {
    display: flex;
    justify-content: center;
  }

  .category-nav-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0 0 56px 0;
    list-style-type: none;
    overflow-x: auto;

    li {
      &:not(:last-child) {
        ${props => props.locale === "ar" ? "margin-left: 8px;" : "margin-right: 8px;"}
      }
    }

    a {
      display: inline-flex;
      border: 1px solid #AAAAAA;
      border-radius: 3px;
      padding: 11px 24px;
      font-size: 13px;
      font-weight: 600;
      line-height: 17px;
      letter-spacing: 0.04em;
      color: #444444;
      text-transform: uppercase;
      transition: border-color 0.3s, color 0.3s;

      &:hover {
        border-color: #FF6F3D;
        color: #FF6F3D;
      }

      &.active {
        border-color: #FF6F3D;
        color: #FF6F3D;
      }

      @media screen and ${device.laptop} {
        white-space: nowrap;
      }
    }

    @media screen and ${device.laptop} {
      flex-wrap: initial;
      padding: 0 40px;
      margin: 0 -40px 56px;
    }

    @media screen and ${device.mobile} {
      padding: 0 16px;
      margin: 0 -16px 40px;
    }
  }

  .category-header {
    margin: 0 auto 72px;
    max-width: 928px;
    text-align: center;

    @media screen and ${device.mobile} {
      margin: 0 auto 48px;
    }
  }

  .category-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;

    @media screen and ${device.mobile} {
      margin-bottom: 24px;
    }
  }

  .category-title {
    margin-bottom: 24px;
    letter-spacing: -0.02em;

    @media screen and ${device.mobile} {
      margin-bottom: 16px;
      font-size: 20px;
      line-height: 27px;
    }
  }

  .category-text {
    font-size: 16px;
    line-height: 24px;
    color: #666666;

    @media screen and ${device.mobile} {
      font-size: 14px;
      line-height: 21px;
    }
  }

  .category-items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px 32px;

    &:not(:last-child) {
      margin-bottom: 56px;
    }

    @media screen and ${device.laptop} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and ${device.mobile} {
      grid-template-columns: repeat(1, 1fr);
      gap: 16px;
    }
  }

  @media screen and ${device.laptop} {
    padding: 56px 0 112px;
  }

  @media screen and ${device.mobile} {
    padding: 40px 0 120px;
  }
`;

export default StyledCategoryContent;
