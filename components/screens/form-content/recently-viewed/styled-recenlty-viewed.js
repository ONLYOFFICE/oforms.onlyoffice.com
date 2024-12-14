import styled from "styled-components";
import { device } from "@utils/devices";

const StyledRecentlyViewed = styled.div`
  padding: 56px 0 40px;

  .recently-viewed-title {
    margin-bottom: 24px;
    letter-spacing: -0.02em;
    color: #333333;
    
    span {
      color: #FF6F3D;
    }
  }

  .recenlty-viewed-items {
    display: flex;
    flex-wrap: wrap;

    @media screen and ${device.laptop} {
      flex-wrap: initial;
      margin: 0 -40px;
      padding: 0 40px;
      overflow-x: auto;
    }

    @media screen and ${device.mobile} {
      margin: 0 -16px;
      padding: 0 16px;
    }
  }

  .short-card {
    margin-bottom: 16px;

    &:not(:last-child) {
      ${props => props.locale === "ar" ? "margin-left: 16px;" : "margin-right: 16px;"}
    }
  }
`;

export default StyledRecentlyViewed;
