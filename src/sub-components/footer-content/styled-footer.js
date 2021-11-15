import styled, { css } from "styled-components";
import { device } from "../../../components/utils/devices";

const StyledFooterMobile = css`

`;

const StyledFooterTablet = css`
    display: contents;
    padding: 0px;
    margin: 0px;

    grid-template-columns: 1fr;
    -ms-grid-columns: 1fr;

    .footer-item-follow {
        height: 100%;
        padding-bottom: 10px;
        border: none;
        .footer-social-links {
            margin: 0 auto;
            max-width: 100%;
            justify-content: center;
        }
        .footer-copyright {
            padding: 10px 0px 50px 0px;
        }
    }
    .footer-item-contact {
        .contact-text {
            display: flex;
        }    
    }  
`;


const StyledFooter = styled.div`
    width: calc(100% - 10vw);
    margin: 0 auto 20px;
    position: relative;
    max-width: 1120px;
    min-width: 769px;

    padding-top: 70px;
    margin-bottom: 25px;
    height: auto;
    display: grid;
    display: -ms-inline-grid;
    grid-template-columns: 0.8fr 0.8fr 0.8fr 1fr;
    -ms-grid-columns: 0.8fr 32px 0.8fr 32px 0.8fr 32px 1fr;
    grid-column-gap: 50px; 
    
    .footer-item-group {
        position: relative;
    }

    .footer-item-contact {
        .footer-link-contact {
            font-size: 13px;
            line-height: 1.4em;
        }
        .contact-text {
            display: flex;
            font-size: 13px;
            margin: 0 0 7px;
            line-height: 1.4em;
        }
    }

    .footer-social-links {
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        max-width: 360px;
        align-items: baseline;
        
        .footer-social {
            list-style-type: none;
            display: inline-block;
            width: 26px;
            height: 42px;
            margin: 0;
            padding-right: 20px;
            vertical-align: middle;
        } 
    }

    .footer-copyright {
        color: #666;
        font-size: 13px;
        margin: 0 0 7px;
        line-height: 1.4em;
    }

    @media (max-width: 1060px) {
        .footer-item-contact {
            .contact-text {
                display: contents;
            }    
        }  
    }

    @media ${device.laptop} {
        width: auto;
        max-width: 928px;
        padding: 0 48px 50px;
        vertical-align: top;
        min-width: unset;
        padding-top: 70px;
        margin-bottom: 25px;
    }

    @media ${device.tablet} {
        ${StyledFooterTablet};
    }

    @media ${device.mobileL} {
        ${StyledFooterMobile};
    }

`;

export default StyledFooter;