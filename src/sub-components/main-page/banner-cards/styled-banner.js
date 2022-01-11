import styled from "styled-components";
import { device } from "../../../../components/utils/devices";

const StyledBanner = styled.div`
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
