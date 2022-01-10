import styled from "styled-components";
import Section from "../../section";
import { device } from "../../../../components/utils/devices";


const StyledBanner = styled(Section)`
    .section-page {
        max-width: none;
    }

    @media ${device.laptopM} {
    .section-page {
      max-width: none;
    }
  }

  @media ${device.laptop} {
    .section-page {
      max-width: none;
    }
  }

  @media ${device.mobile} {
    .section-page {
      max-width: none;
    }
  }
`;

export default StyledBanner;
