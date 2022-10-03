import styled from "styled-components";
import arrow_red from "@public/icons/arrow-red.svg";
import phone from "@public/icons/phone.svg";

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;

  .navitem_features_menu {
    color: #fff;
  }

  .external-link {
    color: #333;
    text-decoration: none;
    :hover {
      color: rgb(255, 111, 61);
    }
  }

  .menu_wrapper {
    flex-direction: unset;
    justify-content: unset;
    align-content: unset;
    flex-wrap: unset;
    align-items: unset;

    @media (min-width: 1150px) {
      &:before {
        display: block;
        position: absolute;
        width: 50%;
        content: "";
        height: 1px;
        background-color: #ff642e;
        transition: width 0.2s ease-in-out;
        left: 0;
        top: 0;
      }

      &:after {
        display: block;
        position: absolute;
        width: 50%;
        content: "";
        height: 1px;
        background-color: #ff642e;
        transition: width 0.2s ease-in-out;
        left: 50%;
        top: 0;
      }
    }
  }

  @media (min-width: 1150px) {
    #navitem_features .menu-items-wrapper {
      left: calc(50% - 465px);
    }
    #navitem_forbusiness .menu-items-wrapper {
      left: calc(50% - 318px);
    }
    #navitem_fordevelopers .menu-items-wrapper {
      left: calc(50% - 186px);
    }
    #navitem_download .menu-items-wrapper {
      left: calc(50% - 440px);
    }
    #navitem_prices .menu-items-wrapper {
      left: calc(50% - 80px);
    }
    #navitem_partners .menu-items-wrapper {
      left: calc(50% - 60px);
    }
    #navitem_about .menu-items-wrapper {
      left: calc(50% - 75px);
    }
  }

  @media (max-width: 1150px) {
    padding: 0;
    background-color: #fff;
    min-height: 100px;
    height: 100%;
    margin: 0;
    position: fixed;
    left: ${(props) => (props.stateMobile ? "0" : "-120vw")};
    top: 0;
    overflow: auto;
    text-align: center;
    font-size: 16px;
    transition: right 0.5s;
    width: 429px;
    z-index: 5;
    display: block;
    padding-top: 8px;
    box-sizing: border-box;
    overflow-x: hidden;

    .menu_wrapper {
      display: block;
      padding-top: 8px;
    }

    .mobile-heading-nav-item {
      cursor: pointer;
      display: block;
      font-size: 18px;
      letter-spacing: 0.03em;
      line-height: 1.33em;
      margin: 0 auto;
      padding: 6px 22px 12px 22px;
      border-bottom: 1px solid #f2f2f2;
      color: #ff6f3d;
      position: relative;
      text-transform: uppercase;
      text-align: center;

      &:before {
        background-image: url(${arrow_red.src});
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: auto 100%;
        display: block;
        content: "";
        width: 10px;
        height: 10px;
        left: 14px;
        position: absolute;
        top: 12px;
        transform: rotate(180deg);
        transition: 0.1s linear;
      }
    }

    .phone_wrapper {
      bottom: 0;
      top: auto;
      width: 100%;
      height: 54px;
      position: absolute;
      right: 0;
      left: auto;
      margin: 0;
      padding: 0;
    }

    .nav-item-mobile-tel {
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 700;
      line-height: 22px;
      background-color: #f6f6f6;
      position: absolute;
      bottom: 0;
      left: 0;
      letter-spacing: 0.02em;
      padding: 15px 16px 15px 20px;
      text-decoration: none;
      width: 100%;
      &:before {
        background-image: url(${phone.src});
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: 18px 18px;
        content: "";
        display: inline-block;
        height: 18px;
        margin: 0 13px 4px 0;
        padding: 0;
        vertical-align: middle;
        width: 18px;
      }
      &:hover {
        color: #333;
      }
    }
  }

  @media (max-width: 600px) {
    width: 267px;

    .mobile-heading-nav-item {
      font-size: 16px;
    }
  }
`;

export default StyledNav;
