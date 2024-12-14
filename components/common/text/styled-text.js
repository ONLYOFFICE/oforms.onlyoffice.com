import styled from "styled-components";

const StyledText = styled.span`
  margin: 0;
  padding: 0;
  font-size: ${(props) => (props.fontSizeProps ? props.fontSizeProps : "14px")};
  font-weight: ${(props) => (props.fontWeightProps && props.fontWeightProps)};
  line-height: ${(props) => (props.lineHeightProps ? props.lineHeightProps : "21px")};
`;

export default StyledText;