import styled from "styled-components";
import { Base } from "../themes";

const StyledSeparator = styled.div`
  display: ${(props) => props.theme.separator.display};
  align-items: ${(props) => props.theme.separator.alignItems};
  height: 100%;
  div {
    height: ${(props) => props.height || props.theme.separator.div.height};
    flex: 1;
    background-color: ${(props) =>
      props.color || props.theme.separator.div.backgroundColor};
  }

  span {
    padding: ${(props) => props.padding || props.theme.separator.span.padding};
  }
`;

StyledSeparator.defaultProps = { theme: Base };

export default StyledSeparator;
