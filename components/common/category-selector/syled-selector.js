import styled from "styled-components";

const StyledSelector = styled.div`
  /* width: 205px; */
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: baseline;
  position: relative;

  .filter-header {
    color: #333333;
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 0 8px;
    cursor: pointer;
  }

  .text-sort-set {
    color: #808080;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .arrow {
    margin-left: 14px;
    cursor: pointer;
  }

  .filter_selector {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: absolute;
    min-width: 291px;
    z-index: 99;
    left: 24px;
    top: 20px;
    padding-top: 14px;
    background-color: #fff;
    border-radius: 3px;
    padding: 24px 0;
    box-shadow: 0px 7px 25px rgb(85 85 85 / 15%);
  }

  .filter_selector-items {
    
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
    display: block;
  }

  .arrow-link{
    display:flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 15px 32px;
      .item_arrow{
        background-image: url(/icons/arrow-right.react.svg);
        width: 24px;
        height: 24px
      }
      &:hover{
        background-color: #f5f5f5;
        color: #ff6f3d;
        & span{
          color: #ff6f3d;
        }
        & .item_arrow{
          background-image: url(/icons/arrow-right-red.react.svg);
        }
      }   
  }

  

  .filter_selector-items:hover {
    color: #ff6f3d;
   
  }

  .item_selector{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 32px;       
  }
  .item_selector_text{
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

export default StyledSelector;
