import styled, {css} from "styled-components";

export const SearchAreaStyled = styled.div`
  ${({isDesktopClient}) => {

    if (isDesktopClient) {
      return css`
        align-items: flex-end;

        .search-area__desc {
          color: #444444;
          padding-bottom: 2.5px;
          gap: 12px;

          &:after {
            background-color: #D8DADC;
          }
        }
        
        .loup-icon {
          color: "rgba(0, 0, 0, 0.8)";
        }

        .input-component__input {
          padding: 8px 0 0 12px;
          color: #444444;
          font-size: 14px;
          line-height: 160%;
        }

        .input-component__label {
          top: 7px;
          color: #A5A5A5;
          font-size: 14px;
          line-height: 160%;
        }

        .input-component__icon svg, .input-component__clear-icon svg {
          color: rgba(0, 0, 0, 0.8);
        }

        .focus .input-component__label {
          transform: translateY(-10px) scale(0.7);
        }
        
        @media screen and (max-width: 601px) {
          border-bottom: 1px solid #D8DADC;
        }
      `
    }

    return css`
      max-width: 1120px;
      margin: 0 auto;
      padding-bottom: 8px;
      border-bottom: 1px solid #666666;
      align-items: center;
      
      .search-area__desc {
        color: #F5F5F5;
        &:after {
          background-color: #AAAAAA;
        }
      }

      .input-component__input {
        color: #FFF;
        font-size: 16px;
        line-height: 22px;
      }

      .input-component__label {
        color: #808080;
        font-size: 16px;
        line-height: 22px;
      }
      
      .input-component__icon svg, .input-component__clear-icon svg {
        color: #808080;
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

  form {
    flex-grow: 1;
  }
`

export const SearchAreaDesc = styled.p`
  margin: 0;
  white-space: nowrap;
  font-weight: 700;
  font-size: 14px;
  line-height: 133%;
  display: flex;
  align-items: center;
  gap: 24px;

  &:after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 16px;
  }
  
  @media (max-width: 600px) {
    display: none;
  }
`
