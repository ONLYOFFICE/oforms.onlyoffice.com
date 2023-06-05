import styled, {css} from "styled-components";

export const SearchAreaStyled = styled.div`
  ${({isDesktopClient}) => {

    if (isDesktopClient) {
      return css`
        .search-area__desc {
          color: ${({theme}) => theme.colors.palette.textNormal};
          border-right-color: ${({theme}) => theme.colors.palette.highlightButtonPressedHover};
        }

        .input-component__input {
          padding: 8px 16px 6.5px 16px;
          color: ${({theme}) => theme.colors.palette.textNormal};
          font-size: 14px;
          line-height: 160%;
        }
        
        .input-component__label {
          top: 6px;
          color: ${({theme}) => theme.colors.palette.textSecondary};
          font-size: 14px;
          line-height: 160%;
        }

        .input-component__icon svg, .input-component__clear-icon svg {
          color: ${({theme}) => theme.colors.palette.iconNormal};
        }
        
        .focus .input-component__label {
          transform: translateY(-9px) scale(0.7);
        }
      `
    }

    return css`
      max-width: 1120px;
      margin: 0 auto;
      padding-bottom: 8px;
      border-bottom: 1px solid ${({theme}) => theme.colors.other.gray300};
      
      .search-area__desc {
        color: ${({theme}) => theme.colors.other.white100};
        border-right-color: ${({theme}) => theme.colors.other.gray100};
      }

      .input-component__input {
        color: ${({theme}) => theme.colors.base.white};
        font-size: 16px;
        line-height: 22px;
      }

      .input-component__label {
        color: ${({theme}) => theme.colors.other.gray400};
        font-size: 16px;
        line-height: 22px;
      }
      
      .input-component__icon svg, .input-component__clear-icon svg {
        color: ${({theme}) => theme.colors.other.gray400};
      }

      .focus .input-component__label {
        transform: translateY(-18px) scale(0.8);
      }
      
      @media (max-width: 1140px) {
        width: 90%;
        max-width: none;
      }

      @media (max-width: 400px) {
        .input-component__label, .input-component__input {
          font-size: 14px;
          line-height: 19px;
        }
      }
    `
  }}
  
  width: 100%;
  display: flex;
  align-items: center;

  form {
    flex-grow: 1;
  }
`

export const SearchAreaDesc = styled.p`
  margin: 0;
  white-space: nowrap;
  padding-right: 24px;
  border-right: 1px solid;
  font-weight: 700;
  font-size: 14px;
  line-height: 133%;
  
  @media (max-width: 600px) {
    display: none;
  }
`