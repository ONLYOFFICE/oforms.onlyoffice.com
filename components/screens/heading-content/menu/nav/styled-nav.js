import styled from "styled-components";

const StyledNav = styled.nav`
  .menu-items-box {
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
  }

  .navitem_features_menu {
    color: #fff;
  }

  .input-wrapper {
    display: none;
  }

  .external-link {
    color: #333;
    text-decoration: none;

    :hover {
      color: rgb(255, 111, 61);
    }
  }

  .menu-wrapper {
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
    box-sizing: border-box;
    overflow-x: hidden;
    
    display: grid;
    grid-template-rows: 1fr max-content;
    
    .menu-items-box {
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
    }
    
    .input-wrapper {
      display: grid;
      grid-template-columns: 1fr;
      padding: 0 18px 18px 18px;
      text-align: left;
      
      .menu-input {
        background-image: url("https://static-www.onlyoffice.com/v9.5.0/images/landing/market-place/search-button.svg");
        background-repeat: no-repeat;
        background-position-x: calc(100% - 14px);
        background-position-y: center;
      }
    }

    .menu-box {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
    }

    .menu-wrapper {
      display: block;
      min-height: 300px;
    }

    .menu-wrapper_dev, .menu-wrapper_partners, .menu-wrapper_pricing {
      height: inherit;
      display: grid;
      grid-template-rows: 1fr max-content;
    }

    .mobile-heading-nav-item {
      cursor: pointer;
      display: block;
      font-size: 18px;
      letter-spacing: 0.03em;
      line-height: 1.33em;
      margin: 0 auto;
      padding: 16px 12px;
      border-bottom: 1px solid #f2f2f2;
      color: #ff6f3d;
      position: relative;
      text-transform: uppercase;
      text-align: center;
      width: 100%;

      &:before {
        background-image: url('https://static-oforms.onlyoffice.com/icons/arrow-red.svg');
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: auto 100%;
        display: block;
        content: "";
        width: 10px;
        height: 10px;
        left: 14px;
        position: absolute;
        top: 22px;
        transform: rotate(180deg);
        transition: 0.1s linear;
      }
    }

    .phone_wrapper {
      //bottom: 0;
      //top: auto;
      //width: 100%;
      //height: 54px;
      //position: absolute;
      //right: 0;
      //left: auto;
      //margin: 0;
      //padding: 0;
    }

    .nav-item-mobile-tel {
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 700;
      line-height: 22px;
      background-color: #f6f6f6;
      //position: absolute;
      //bottom: 0;
      //left: 0;
      letter-spacing: 0.02em;
      padding: 15px 16px 15px 20px;
      text-decoration: none;
      width: 100%;

      &:before {
        background-image: url('https://static-oforms.onlyoffice.com/icons/phone.svg');
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
  
  @media (max-width: 500px) {
    .menu-wrapper {
      width: 90vw;
    }
  }
`;

export default StyledNav;
