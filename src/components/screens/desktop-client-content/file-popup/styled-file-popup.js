import styled, { css } from "styled-components";

const StyledFilePopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.palette.backgroundScrim};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;

  &.open {
    opacity: 1;
    visibility: visible;
  }

  .popup-wrapper {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px;
    min-height: 100%;
  }

  .popup-content {
    box-sizing: border-box;
    border: 1px solid #CBCBCB;
    border-radius: 5px;
    width: 100%;
    max-width: 889px;
    overflow: hidden;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;

    
    box-shadow: ${({theme}) => theme.boxShadows.shadowWindow};
    background-color: ${({theme}) => theme.colors.palette.backgroundNormal};
    border: 1px solid ${({theme}) => theme.colors.palette.borderToolbar};
  }

  .popup-header {
    display: grid;
    grid-template-columns: auto 19px;
    gap: 24px;
    padding: 10px 10px 9px 30px;
    border-bottom: 1px solid ${({theme}) => theme.colors.palette.borderToolbar};

    
    background-color: ${({theme}) => theme.colors.palette.backgroundToolbar};
  }

  .popup-title {
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.02em;
    
    
    color: ${({theme}) => theme.colors.palette.textNormal}
  }

  .popup-body {
    padding: 27px;
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 32px;
  }

  .file-img {
    mix-blend-mode: normal;
    border-radius: 3px;
    overflow: hidden;
    img {
      display: block;
    }


    border: 1px solid ${({theme}) => theme.colors.palette.borderToolbarButtonHover};
  }

  .file-content {
    width: 100%;
    font-size: 14px;
    line-height: 22px;
    color: #333333;
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }

  .file-main-description {
    padding-bottom: 23px;
    border-bottom: 1px solid ${({theme}) => theme.colors.palette.borderToolbarButtonHover};
  }

  .file-title {
    margin: 0 0 8px;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.02em;


    color: ${({theme}) => theme.colors.palette.textNormal};
  }

  .file-info-type {
    margin-bottom: 12px;
    color: ${({theme}) => theme.colors.palette.textNormal};
  }

  .file-description {
    font-size: 14px;
    line-height: 22px;
    outline: none;


    color: ${({theme}) => theme.colors.palette.textNormal};
  }

  .file-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
    row-gap: 12px;
    column-gap: 24px;
  }

  .file-info-block {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .file-info-item {
    display: flex;
    align-items: center;
    line-height: 22px;
  }
  
  .file-info-item__selector {
    padding-right: 20px;
  }

  .file-info-label {
    margin-right: 8px;
    color: ${({theme}) => theme.colors.palette.textSecondary};
  }

  .file-info-value {
    font-weight: 700;
    color: ${({theme}) => theme.colors.palette.textNormal}
  }

  .file-button {
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    border-radius: 3px;
    padding: 6.5px 12px;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    height: 36px;
    min-width: 157px;
    text-decoration: none;
    text-transform: initial;


    color: ${({theme}) => theme.colors.palette.textInverse};
    background-color: ${({theme}) => theme.colors.palette.backgroundPrimaryDialogButton};

    &:hover {
      background-color: ${({theme}) => theme.colors.palette.backgroundPrimaryDialogButtonHover};
    }

    &:active {
      opacity: 0.4;
    }
  }

  .file-select {
    position: relative;
    cursor: pointer;
  }

  .file-select-placeholder {
    display: flex;
    align-items: center;

    &.open {
      .file-select-icon {
        transform: rotate(180deg);
      }
      ~ .file-dropdown {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .file-select-title {
    margin-right: 4px;
    min-width: 33px;
    font-weight: 700;
    line-height: 19px;

    color: ${({theme}) => theme.colors.palette.textNormal};
  }

  .file-select-icon {
    display: flex;
    width: 16px;
    height: 16px;
    transition: transform 0.3s;
    
    & path {
      fill: ${({theme}) => theme.colors.palette.iconNormal}
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .file-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    border-radius: 2px;
    padding: 4px 0;
    min-width: 106px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    
    
    
    background-color: ${({theme}) => theme.colors.palette.backgroundNormal};
    border: 1px solid ${({theme}) => theme.colors.palette.highlightButtonHover};
    box-shadow: ${({theme}) => theme.boxShadows.menuShadow};
    
    .file-dropdown-item {
      color: ${({theme}) => theme.colors.palette.textNormal};
      
      &.selected {
        background-color: ${({theme}) => theme.colors.palette.canvasScrollThumb};
      }
      &:hover {
        background-color: ${({theme}) => theme.colors.palette.canvasScrollThumbHover};
      }
    }
  }

  .file-dropdown-item {
    display: block;
    padding: 3px 11px 2px;
    color: #000000;
    transition: color 0.3s, background-color 0.3s;

    &:hover {
      background: #E0E0E0;
    }

    &.selected {
      background-color: #CCCCCC;
    }
  }
`;

const CloseButton = styled.div`
  margin-top: 1px;
  width: 19px;
  height: 19px;
  cursor: pointer;
  background-image: url('https://static-oforms.onlyoffice.com/icons/close-icon.svg');
  background-repeat: no-repeat;
  background-position: center center;
`;

export { CloseButton, StyledFilePopup };