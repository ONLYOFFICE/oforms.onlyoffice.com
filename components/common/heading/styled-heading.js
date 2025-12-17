import styled from "styled-components";
import { device } from "@utils/devices";

const StyledHeading = styled.h1`
  margin: 0;
  padding: 0;
  font-size: ${(props) => 
    props.$level === 1 ? "40px" : 
    props.$level === 2 ? "32px" :
    props.$level === 3 ? "24px" :
    props.$level === 4 ? "18px" :
    props.$level === 5 ? "14px" :
    props.$level === 6 ? "13px" : "40px"
  };
  line-height: ${(props) => 
    props.$level === 1 ? "53px" : 
    props.$level === 2 ? "38px" :
    props.$level === 3 ? "32px" :
    props.$level === 4 ? "24px" :
    props.$level === 5 ? "19px" :
    props.$level === 6 ? "18px" : "53px"
  };
  font-weight: 700;

  @media screen and ${device.laptop} {
    font-size: ${(props) => 
      props.$level === 1 ? "24px" : 
      props.$level === 2 ? "24px" :
      props.$level === 3 ? "24px" : ""
    };
    line-height: ${(props) => 
      props.$level === 1 ? "32px" : 
      props.$level === 2 ? "32px" :
      props.$level === 3 ? "32px" : ""
    };
  }
`;

export default StyledHeading;
