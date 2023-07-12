import styled from "styled-components";

export const HeaderStyled = styled.header`
  padding-bottom: 21px;
  padding-top: 41px;

  .clear-icon {
    cursor: pointer;
    color: ${({theme}) => theme.colors.palette.iconContrastPopover};
    transition: transform 50ms ease-in-out;
    right: 0;
    position: absolute;

    &:hover {
      color: ${({theme}) => theme.colors.palette.iconContrastPopoverHover};
    }
  }

  .search-icon {
    color: ${({theme}) => theme.colors.palette.iconNormal};
    margin-right: 4px;
    cursor: pointer;
    
    &:hover {
      
    }
  }
`

export const HeaderTitle = styled.h3`
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 32px;
  margin: 0 0 13px 0;
  color: ${({theme}) => theme.colors.palette.textNormal}
`

export const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const HeaderInputWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const HeaderForm = styled.form`
  display: flex;
  align-items: center;
  height: 30px;
  border-bottom: ${({active, theme}) => active ? `1px solid ${theme.colors.palette.borderToolbarButtonHover}` : undefined};
  position: relative;
`

export const HeaderInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  margin: 0;
  width: ${({active}) => active ? '250px' : 0} ;
  transition: width 300ms ease-in-out;
  color: ${({theme}) => theme.colors.palette.textNormal};
`
