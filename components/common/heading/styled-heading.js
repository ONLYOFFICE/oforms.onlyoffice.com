import styled from "styled-components";
import { device } from "@utils/devices";

const StyledHeading = styled.h1`
  margin: 0;
  padding: 0;
  font-size: ${(props) => 
    props.$size === 1 ? "40px" : 
    props.$size === 2 ? "32px" :
    props.$size === 3 ? "24px" :
    props.$size === 4 ? "18px" :
    props.$size === 5 ? "14px" :
    props.$size === 6 ? "13px" : "40px"
  };
  line-height: ${(props) => 
    props.$size === 1 ? "53px" : 
    props.$size === 2 ? "38px" :
    props.$size === 3 ? "32px" :
    props.$size === 4 ? "24px" :
    props.$size === 5 ? "19px" :
    props.$size === 6 ? "18px" : "53px"
  };
  font-weight: 700;

  @media screen and ${device.laptop} {
    font-size: ${(props) => 
      props.$size === 1 ? "24px" : 
      props.$size === 2 ? "24px" :
      props.$size === 3 ? "24px" : ""
    };
    line-height: ${(props) => 
      props.$size === 1 ? "32px" : 
      props.$size === 2 ? "32px" :
      props.$size === 3 ? "32px" : ""
    };
  }
`;

export default StyledHeading;
