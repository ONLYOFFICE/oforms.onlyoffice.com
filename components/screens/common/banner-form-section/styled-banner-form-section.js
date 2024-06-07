import styled from "styled-components";
import Section from "@components/common/section";
import { device } from "@utils/devices";

const StyledBannerFormSection = styled(Section)`
  padding: 112px 0;
  background-color: #333333;

  @media screen and ${device.laptop} {
    padding: 80px 0;
  }

  @media screen and ${device.mobile} {
    padding: 48px 0;
  }
`;

export default StyledBannerFormSection;
