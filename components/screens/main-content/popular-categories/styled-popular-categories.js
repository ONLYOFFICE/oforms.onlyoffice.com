import styled from "styled-components";
import { device } from "@utils/devices";

const StyledPopularCategories = styled.div`
  position: relative;
  margin: 0 -56px;
  padding: 56px 56px 30px;
  background-color: #ffffff;

  .popular-categories-title {
    margin-bottom: 24px;
    letter-spacing: -0.02em;
    color: #444444;

    @media screen and ${device.mobile} {
      font-size: 22px;
      line-height: 29px;
      letter-spacing: -0.01em;
    }
  }

  .popular-categories-links {
    display: flex;
    flex-wrap: wrap;
  }

  .popular-categories-link {
    display: inline-flex;
    border: 1px solid #AAAAAA;
    margin-bottom: 16px;
    padding: 16px 24px;
    font-size: 16px;
    line-height: 24px;
    color: #444444;
    transition: border-color 0.3s, color 0.3s;

    &:hover {
      border-color: #FF6F3D;
      color: #FF6F3D;
    }

    &:not(:last-child) {
      margin-right: 16px;
    }

    @media screen and ${device.mobile} {
      padding: 12px 24px;
    }
  }

  @media screen and (max-width: 1232px) {
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      width: 100vw;
      height: 100%;
      background-color: #fff;
      transform: translateX(-100%);
    }

    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
      width: 100vw;
      height: 100%;
      background-color: #fff;
      transform: translateX(100%);
    }
  }

  @media screen and ${device.laptop} {
    margin: 0 -40px;
    padding: 40px 40px 30px;

    &:before,
    &:after {
      content: none;
    }
  }

  @media screen and ${device.mobile} {
    margin: 0 -16px;
    padding: 32px 32px 16px;
  }
`;

export default StyledPopularCategories;
