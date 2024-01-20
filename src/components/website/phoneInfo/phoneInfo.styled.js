import styled, { keyframes } from 'styled-components';

const runningLine = keyframes`
    from {
        width: 0;
    }

    to {
        width: 50%;
    }
`;

export const PhoneInfoStyled = styled.div`
    position: relative;
    height: inherit;
`;

export const PhoneInfoIconWrapper = styled.button`
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    height: 100%;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        color: #FFF;
    }

    &.inverted svg {
        color: #444444;
    }
    
    &.open svg {
        color: #FF642E;
    }
`;

export const PhoneInfoDropdown = styled.div`
    position: absolute;
    z-index: 1;
    right: -100px;
    width: max-content;

    padding: 32px;

    background-color: #FFFFFF;
    box-shadow: 0 20px 50px 0 rgba(85, 85, 85, 0.1);
    border-radius: 0 0 8px 8px;

    &:after, &:before {
        animation-name: ${runningLine};
        animation-duration: 300ms;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in-out;
    }

    &:after {
        display: block;
        position: absolute;
        width: 50%;
        content: "";
        height: 1px;
        background-color: #FF642E;
        left: 50%;
        top: 0;
    }

    &:before {
        display: block;
        position: absolute;
        width: 50%;
        content: "";
        height: 1px;
        background-color: #FF642E;
        right: 50%;
        top: 0;
    }
`;

export const PhoneInfoTitle = styled.h3`
    margin: 0 0 16px 0;
    padding: 7px 12px;
    border-radius: 5px;
    color: #666666;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.52px;
    text-transform: uppercase;
    background-color: #F5F5F5;
`;

export const PhoneInfoPhoneLink = styled.a`
    display: block;
    margin-bottom: 16px;
    padding: 0 12px;
    color: #333333;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.28px;
    text-decoration: none;

    &:hover {
        color: #FF6F3D;
    }
`;

export const PhoneInfoRequestCallLink = styled.a`
    display: block;
    padding: 0 12px;
    color: #444444;
    font-size: 14px;
    letter-spacing: 0.28px;
    text-decoration-line: underline;

    &:hover {
        color: #FF6F3D;
    }
`;
