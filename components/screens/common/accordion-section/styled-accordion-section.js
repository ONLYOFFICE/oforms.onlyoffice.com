import styled from "styled-components";
import Section from "@components/common/section";
import { device } from "@utils/devices";

const StyledBannerForm = styled(Section)`
  padding: 112px 0;

  .accordion-section-title {
    margin-bottom: 56px;
    letter-spacing: -0.02em;

    @media screen and ${device.mobile} {
      margin-bottom: 24px;
    }
  }

  @media screen and ${device.laptop} {
    padding: 88px 0;
  }

  @media screen and ${device.mobile} {
    padding: 48px 0;
  }
`;

export default StyledBannerForm;
