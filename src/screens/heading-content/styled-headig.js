import styled from "styled-components";

const StyledHeadingContent = styled.div`
  background: ${(props) => (props.templateForm ? "#F5F5F5" : props.template ? `#F9F9F9` : `#333`)};
`;

export default StyledHeadingContent;
