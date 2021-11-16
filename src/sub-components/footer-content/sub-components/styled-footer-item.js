import styled, { css } from "styled-components";
import { device } from "../../../../components/utils/devices";

const StyledFooterMobile = css`

`;

const StyledFooterTablet = css`
display: block;
padding: 5px 10px;
margin: 0 20px;
border-bottom: 1px solid #E5E5E5;

.footer-item-heading {
    cursor: pointer;
    overflow: hidden;
    transition: all 0.4s linear 0s;
}

.footer-items-group {
    visibility: visible;
    position: initial;
    margin-bottom: 0px;
    margin-top: 0px;
    height: 0px;
    
    ${props => props.isOpen ? css`
        display: grid;
        visibility: visible;
        position: initial;
        height: 100% !important;
        `
        : css`
        visibility: visible;
        position: initial;
        margin-bottom: 0px;
        margin-top: 0px;
        height: 0px;
        `        
    }

}
`;

const StyledFooterItem = styled.div`
    display: grid;
    position: relative;
    padding: 0 0 35px;
    white-space: break-spaces;
    .footer-items-group {
        display: grid;
    }

    .footer-link {
        color: #333;
        font-size: 13px;
        margin: 0 0 7px;
        line-height: 1.4em;
        text-decoration: none;
        -webkit-transition: color 0.2s,border 0.5s;
        -moz-transition: color 0.2s,border 0.5s;
        -o-transition: color 0.2s,border 0.5s;
        transition: color 0.2s,border 0.5s;

        &:hover {
            color: #FF6F3D;
        }
    }

    .footer-item-heading {
        font-size: 12px;
        padding: 0 0 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.02em;
    }

    @media ${device.tablet} {
        ${StyledFooterTablet};
    }

    @media ${device.mobile} {
        ${StyledFooterMobile};
    }
`;

export default StyledFooterItem;