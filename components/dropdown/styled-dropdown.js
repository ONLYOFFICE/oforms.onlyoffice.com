import styled from "styled-components";
import { Base } from "../themes";


const StyledDropdown = styled.div`
position: relative;
font-size: 24px;
line-height: 133%;
font-weight: bold;
letter-spacing: -0.02em;
color: #333333;
cursor: pointer;
user-select: none;
`;

StyledDropdown.defaultProps = { theme: Base };

export default StyledDropdown;