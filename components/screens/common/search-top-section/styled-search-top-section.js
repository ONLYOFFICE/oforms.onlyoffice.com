import styled from "styled-components";
import { device } from "@utils/devices";

const StyledSearchTopSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: space-between;
  margin-bottom: 40px;

  .search-input {
    max-width: 280px;

    @media screen and ${device.mobile} {
      max-width: 224px;
    }
  }

  .back-btn {
    align-items: center;
    display: flex;
    gap: 8px;

    svg {
      transform: ${props => props.locale === "ar" && "rotate(180deg)"};

      path {
        transition: fill 0.3s;
      }
    }

    .back-btn-link {
      font-size: 13px;
      font-weight: 600;
      line-height: 17px;
      letter-spacing: 0.04em;
      color: #444444;
      text-transform: uppercase;
      transition: color 0.3s;

      @media screen and ${device.mobile} {
        display: none;
      }
    }

    &:hover {
      .back-btn-link {
        color: #FF6F3D;
      }

      svg {
        path {
          fill: #FF6F3D;
        }
      }
    }
  }
`;

export default StyledSearchTopSection;
