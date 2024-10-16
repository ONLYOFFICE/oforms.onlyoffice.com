import styled from "styled-components";

const StyledTextInput = styled.div`
  position: relative;
  width: 100%;

  .label {
    display: block;
    font-size: 16px;
    line-height: 24px;
    color: #333333;
    pointer-events: none;

    ${(props) => props.label && `
      position: absolute;
      top: 16px;
      left: 48px;
      color: #AAAAAA;
      transition: top 0.3s, font-size 0.3s, line-height 0.3s, color 0.3s;
    `}
  }

  .text-input-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    pointer-events: none;

    path {
      fill: #808080;
    }
  }

  .input {
    box-sizing: border-box;
    border: 1px solid #AAAAAA;
    border-radius: 3px;
    padding: ${(props) => (props.searchIcon ? "16px 48px" : "16px 48px 16px 16px")};
    font-size: 16px;
    line-height: 22px;
    width: 100%;
    height: 56px;
    color: #AAAAAA;
    background-color: transparent;
    outline: none;
    
    &::placeholder {
      color: ${(props) => (props.placeholder ? "transparent" : "#AAAAAA")};
    }

    &:focus,
    &.focus {
      padding: 24px 48px 8px 48px;

      + .label {
        top: 8px;
        font-size: 12px;
        line-height: 16px;
        color: #AAAAAA;
      }
    }
  }

  .input-btn {
    position: absolute;
    top: 50%;
    right: 16px;
    border: none;
    padding: 0;
    margin: 0;
    width: 24px;
    height: 24px;
    background-color: transparent;
    transform: translateY(-50%);
    cursor: pointer;

    path {
      fill: #666666;
    }
  }

  .error-text {
    display: inline-block;
    margin: 0;
    padding: 0;
    color: #cb0000;
    font-size: 13px;
    font-weight: 400;
    line-height: 21px;
  }
`;

export default StyledTextInput;
