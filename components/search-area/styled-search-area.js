import styled from "styled-components";
import { device } from "../../components/utils/devices";

const StyledSearchArea = styled.div`
  background-color: #333;
  position: relative;
  width: 100%;

  .search_container {
    margin: 24px auto 0;
    max-width: 1120px;
    border-bottom: 1px solid #666;
  }

  .presearch_title {
    display: inline-block;
    line-height: 1em;
    padding-right: 24px;
    border-right: 1px solid #aaa;
    overflow: unset;
    white-space: nowrap;
  }

  .search_input {
    border: none;
    padding: 21px 118px 21px 15px;
    white-space: normal;
  }
  .search_icon {
    padding: 16px;

    svg {
      cursor: pointer;
      fill: "#AAAAAA";
    }
  }

  @media ${device.laptopM} {
    .search_container {
      max-width: 928px;
    }
  }
  @media ${device.laptop} {
    .search_container {
      max-width: none;
      width: 90vw;
    }
  }
  @media (max-width: 600px) {
    .presearch_title {
      display: none;
    }
    .search_input {
      padding: 16px 40px 16px 8px;
    }

    .input-label {
      padding: 0 8px;
    }

    .search_icon {
      padding: 16px 8px;
    }
  }
  @media ${device.mobile} {
    .input-label {
      font-size: 14px;
      top: 35%;
    }
  }
`;
export default StyledSearchArea;
