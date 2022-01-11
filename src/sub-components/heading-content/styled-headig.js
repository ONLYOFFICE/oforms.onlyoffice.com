import styled from "styled-components";
import { device } from "../../../components/utils/devices";

const StyledHeadingContent = styled.div`
  background: ${(props) => (props.template ? `#F9F9F9` : `#333`)};

  @media (max-width: 1050px) {
    padding-top: 10px;
  }
`;

export default StyledHeadingContent;
