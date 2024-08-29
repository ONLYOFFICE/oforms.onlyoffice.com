import styled from "styled-components";
import { device } from "@utils/devices";
import arrowRightCircleIcon from "@public/icons/arrow-right-circle.svg";

const StyledCardsBlock = styled.div`
  .cards-block-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    @media screen and ${device.mobile} {
      align-items: initial;
      justify-content: initial;
      flex-direction: column;
    }
  }

  .cards-block-title {
    margin-right: 10px;
    letter-spacing: -0.02em;

    @media screen and ${device.mobile} {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }

  .cards-block-link {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    line-height: 22px;
    color: #FF6F3D;
    text-decoration: underline;

    &.ar::after {
      margin-left: 0;
      margin-right: 8px;
      transform: rotate(180deg);
    }

    &:after {
      content: "";
      display: block;
      margin-left: 8px;
      width: 24px;
      height: 24px;
      background-image: url(${arrowRightCircleIcon.src});
    }

    &:hover {
      text-decoration: none;
    }

    @media screen and ${device.mobile} {
      font-size: 13px;
      line-height: 21px;
    }
  }

  .cards-block-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px 32px;

    @media screen and ${device.laptop} {
      grid-template-columns: repeat(2, 1fr);

      .card:not(:nth-child(-n+4)) {
        display: none;
      }
    }

    @media screen and ${device.mobile} {
      grid-template-columns: repeat(1, 1fr);
    }

    @media screen and ${device.mobile} {
      gap: 16px;
    }
  }

  @media screen and ${device.mobile} {
    padding-top: 24px;
  }
`;

export default StyledCardsBlock;
