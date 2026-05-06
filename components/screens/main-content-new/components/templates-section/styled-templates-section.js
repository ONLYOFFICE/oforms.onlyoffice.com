import styled from "styled-components";
import { device } from "@utils/devices";

const StyledSection = styled.section`
  padding-bottom: 56px;

  .section-title-link {
    display: inline-block;
    text-decoration: none;
    margin-bottom: 24px;

    .section-title {
      transition: color 0.2s;
    }

    &:hover .section-title {
      color: #32118A;
    }
  }

  .section-title {
    font-family: "Sora", sans-serif;
    font-size: 24px;
    line-height: 1.33em;
    font-weight: 700;
    color: #3a3c49;
    margin: 0 0 24px;
  }

  .section-title-link .section-title {
    margin: 0;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  @media screen and (${device.laptopM}) {
    .cards-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (${device.laptop}) {
    .cards-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (${device.mobile}) {
    .cards-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default StyledSection;
