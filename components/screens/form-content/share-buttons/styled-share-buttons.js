import styled from "styled-components";
import x from "@public/icons/x.svg";
import wechat from "@public/icons/wechat.svg";
import weibo from "@public/icons/weibo.svg";

const StyledShareButtons = styled.div`
  display: flex;
  align-items: center;

  .share-buttons-title {
    ${props => props.$locale === "ar" ? "margin-left: 8px;" : "margin-right: 8px;"}
    font-size: 13px;
    font-weight: 600;
    line-height: 21px;
    color: #AAAAAA;
  }

  .share-buttons-list {
    display: flex;
    padding: 0;
    margin: 0;
    list-style-type: none;

    li {
      display: inline-flex;
    }
  }

  .share-button {
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    padding: 4px;
    width: 48px;
    height: 48px;

    &:not(:last-child) {
      margin-right: 8px;
    }

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      display: inline-flex;
      border-radius: 3px;
      width: 40px;
      height: 40px;
      background-repeat: no-repeat;
      background-position: center;
      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);
      transform: translate(-50%, -50%);
      transition: box-shadow 0.3s;
    }

    &.x {
      &:after {
        background-image: url(${x.src});
      }
    }

    &.email {
      &:after {
        background-image: url("https://static-oforms.onlyoffice.com/images/social-icons/mail.react.svg");
      }
    }

    &.linkedin {
      &:after {
        background-image: url("https://static-oforms.onlyoffice.com/images/social-icons/linkedin.react.svg");
      }
    }

    &.wechat {
      &:after {
        background-image: url(${wechat.src});
        background-size: 24px 24px;
      }
    }

    &.weibo {
      &:after {
        background-image: url(${weibo.src});
      }
    }

    &:hover {
      &:after {
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
      }
    }
  }
`;

export default StyledShareButtons;
