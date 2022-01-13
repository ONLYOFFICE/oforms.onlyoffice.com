import styled from "styled-components";
import { device } from "../../../components/utils/devices";

const StyledHeadingContent = styled.div`
  background: ${(props) => (props.template ? `#F9F9F9` : `#333`)};
`;

export default StyledHeadingContent;
