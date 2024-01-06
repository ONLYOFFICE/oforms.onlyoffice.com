import styled, {keyframes} from 'styled-components';

const expand = keyframes`
    from {
        width: 0;
    }
    
    to {
        width: 200px;
    }
`

const collapse = keyframes`
    from {
        width: 200px;
    }
    
    to {
        width: 0;
    }
`

const expandForNarrowScreen = keyframes`
    from {
        width: 0;
    }
    
    to {
        width: auto;
    }
`

const collapseForNarrowScreen = keyframes`
    from {
        width: auto;
    }
    
    to {
        width: 0;
    }
`

export const SearchInputForm = styled.form`
    display: flex;
    align-items: center;
    gap: 4px;
    
    @media screen and (max-width: 500px) {
        
    }
`

export const SearchInputWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 24px;
    align-items: center;
    
    animation-duration: 200ms;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    
    @media screen and (min-width: 501px) {
        width: 200px;
        
        &:not(.inputExpanded):not(.withoutAnimation) {
            animation-name: ${collapse};
        }

        &.inputExpanded:not(.withoutAnimation) {
            animation-name: ${expand};
        }
        
        &:not(.inputMounted) {
            display: none;
        }
    }
`

export const SearchInputLoupWrapper = styled.button`
    display: flex;
    cursor: pointer;
    
    border: 0;
    padding: 0;
    margin: 0;
    background-color: transparent;
    
    svg {
        color: ${({theme}) => theme.colors.newPalette.iconNormal};
    }
`

export const SearchInputStyled = styled.input`
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    min-width: 0;
    height: 21px;
    background-color: transparent;
    color: ${({theme}) => theme.colors.newPalette.textNormal};
    
    &::placeholder {
        color: ${({theme}) => theme.colors.newPalette.textSecondary};
    }
`

export const SearchInputXCloseWrapper = styled.button`
    display: flex;
    cursor: pointer;

    border: 0;
    padding: 0;
    margin: 0;
    background-color: transparent;
    
    svg {
        color: ${({theme}) => theme.colors.newPalette.iconNormal};
    }
`
