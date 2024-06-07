import styled from "styled-components";

const StyledShareButtons = styled.div`
  display: flex;
  align-items: center;

  .share-buttons-title {
    margin-right: 8px;
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
  }

  .share-button {
    position: relative;
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

    &.twitter {
      &:after {
        background-image: url("https://static-oforms.onlyoffice.com/images/social-icons/twitter.react.svg");
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

    &:hover {
      &:after {
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
      }
    }
  }
`;

export default StyledShareButtons;
