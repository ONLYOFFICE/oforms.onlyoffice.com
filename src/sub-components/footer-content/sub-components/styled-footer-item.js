import styled, { css } from "styled-components";
import { device } from "../../../../components/utils/devices";

const StyledFooterTablet = css`
display: block;
padding: 17px 10px;
margin: 0 20px;
border-bottom: 1px solid #E5E5E5;

.footer-item-heading {
    padding: 0;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.4s linear 0s;
}

    .footer-item-heading-arrow {
        display: block;
        position: absolute;
        right: 10px;
        top: 14px;
        z-index: -1;
        transition: 0.1s linear;
        &.up {
            transform: rotate(180deg);
        }
    }

    .footer-items-group {
        display: grid;
        position: initial;
        margin-bottom: 0px;
        overflow: hidden;
        max-height: 0px;                   
        transition: max-height 0.2s ease, margin-top 0.2s ease;
        
        ${props => props.isOpen ? css`
            display: grid;
            grid-gap: 7px;
            margin-top: 20px;        
            position: initial;
            height: 100% !important;        
            `
        : css`        
            position: initial;
            margin-bottom: 0px;
            margin-top: 0px;
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
        max-height: 100% ;
    }

    .footer-link {
        color: #333;
        font-size: 13px;        
        line-height: 1.4em;
        margin: 0px 0px 7px;
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

    .footer-item-heading-arrow {
        display: none;

    }

    @media ${device.tablet} {
        ${StyledFooterTablet};
    }
`;

export default StyledFooterItem;