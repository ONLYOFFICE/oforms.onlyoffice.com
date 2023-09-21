import styled from "styled-components";

export const CardsWrapper = styled.div`
  padding: 0 50px 40px 40px;
  max-height: inherit;
  overflow-y: auto;
`

export const CardsStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;

  list-style: none;
  margin: 0;
  padding: 0;
`

export const ToTopButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  background-color: transparent;
  cursor: pointer;
  opacity: ${({active}) => active ? 1 : 0};
  pointer-events: ${({active}) => active ? undefined : 'none'};
  transition: opacity 300ms ease-in-out;
  
  position: absolute;
  bottom: 85px;
  right: 12px;
  
  rect {
    fill: ${({theme}) => theme.colors.palette.toTopIconBackground};
  }

  path {
    fill: ${({theme}) => theme.colors.palette.toTopIcon};
  }
  
  &:hover {
    rect {
      fill: ${({theme}) => theme.colors.palette.toTopIconBackgroundHover};
    }
  }
`
