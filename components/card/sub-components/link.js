import styled from "styled-components";
import InternalLink from "../../internal-link";

const ELink = styled(InternalLink)`
text-decoration: none;
color: #444444;
font-weight: 700;
font-size: 16px;
line-height: 22px;

&:hover {
    color: #FF6F3D;
}

@media(max-width: 768px) {
    font-size: 14px;
    line-height: 19px;  
}

@media(max-width: 425px) {
    font-size: 14px;
    line-height: 19px; 
}
`;

export default ELink;