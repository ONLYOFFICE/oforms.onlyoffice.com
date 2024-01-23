import styled, { keyframes } from 'styled-components';

const focusAnimation = keyframes`
    from {
        transform: translateY(0) scale(1);
    }

    to {
        transform: translateY(-16px) scale(0.7);
    }
`;

const blurAnimation = keyframes`
    from {
        transform: translateY(-16px) scale(0.7);
    }

    to {
        transform: translateY(0) scale(1);
    }
`;

export const SearchAreaWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    border-bottom: 1px solid #666666;

    @media screen and (min-width: 561px) {
        padding-bottom: 7px;
    }
`;

export const SearchAreaDesc = styled.span`
    color: #F5F5F5;
    font-size: 14px;
    font-weight: 700;
    line-height: 133%;
    padding-left: 16px;

    @media screen and (max-width: 560px) {
        display: none;
    }
`;

export const SearchAreaLine = styled.div`
    width: 1px;
    height: 16px;
    background-color: #AAA;

    @media screen and (max-width: 560px) {
        display: none;
    }
`;

export const SearchAreaForm = styled.form`
    display: flex;
    align-items: center;
    flex-grow: 1;
    gap: 8px;

    position: relative;
`;

export const SearchAreaInput = styled.input`
    padding: 16px 0 16px 16px;

    margin: 0;
    border: none;
    background-color: transparent;
    outline: none;
    color: #fff;

    flex-grow: 1;

    @media screen and (max-width: 560px) {
        padding: 16px 0 16px 8px;
    }
`;

export const SearchAreaInputLabel = styled.label`
    color: #AAA;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    position: absolute;
    left: 16px;
    pointer-events: none;
    transform: translateY(0);
    transform-origin: left top;

    animation-duration: ${({ $isWithoutAnimation }) => $isWithoutAnimation ? '0ms' : '200ms'};
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: calc(100% - 65px);

    &:not(.initial):not(.focus) {
        animation-name: ${blurAnimation};
    }

    &.focus {
        animation-name: ${focusAnimation};
    }

    @media screen and (max-width: 560px) {
        left: 8px;
    }
`;

export const SearchAreaSearchIconWrapper = styled.button`
    display: flex;
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 16px 16px 16px 0;

    cursor: pointer;

    svg {
        color: #AAAAAA;
    }

    @media screen and (max-width: 560px) {
        padding: 16px 8px 16px 0;
    }
`;
