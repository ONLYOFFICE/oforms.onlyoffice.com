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

  .heading-nav-item {
    padding: 0;
    font-size: 13px;
    line-height: 17px;
    cursor: pointer;
    white-space: nowrap;
    display: block;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #444;
  }

  .filter_selector {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: absolute;
    min-width: 291px;
    z-index: 99;
    left: -26px;
    top: calc(100% + 18px);
    padding-top: 14px;
    background-color: #fff;
    border-radius: 3px;
    padding: 24px 0;
    box-shadow: 0px 7px 25px rgb(85 85 85 / 15%);

    &:before {
      content "";
      position: absolute;
      width: 100%;
      height 18px;
      top: -18px;
      left: 0;
      background-color: transparent;
    }
  }

  .filter_selector-items {
    font-size: 13px;
    cursor: pointer;
    white-space: nowrap;
    display: block;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #444;
  }

  .filter_selector-items-header {
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    cursor: pointer;

      &:hover{
        color: #ff6f3d;
    }
  }

  .arrow-link{
    display:flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 15px 32px;
      .item_arrow{
        background-image: url('https://static-oforms.onlyoffice.com/icons/arrow-right.svg');
        width: 24px;
        height: 24px;
      }
      &:hover{
        background-color: #f5f5f5;
        color: #ff6f3d;

        &:first-child {
          background-color: #fff;
        } 

        & span{
          color: #ff6f3d;
        }
        & .item_arrow{
          background-image: url('https://static-oforms.onlyoffice.com/icons/arrow-right-red.svg');
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
    padding: 15px 40px;       
  }
  .item_selector_text{
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .types_list {
    display: ${(props) => (props.isOpen ? "grid" : "none")};
    min-width: 400px;
    grid-template-columns: 1fr 1fr;
    gap: 0px;
    position: absolute; 
    z-index: 99;
    left: 290px;
    top: 0px;
    padding: 15px 0;
    background-color: #fff;
    border-radius: 3px;    
    box-shadow: 0px 7px 25px rgb(85 85 85 / 15%);
  }

  .submenu_link{
    display:flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 15px 32px;

    span {
      text-transform: capitalize;
      font-size: 16px;
      font-weight: 400;
    }

      .item_arrow{
        background-image: url('https://static-oforms.onlyoffice.com/icons/arrow-right.svg');
        width: 24px;
        height: 24px;
      }
      &:hover{
        
        color: #ff6f3d;
        & span{
          color: #ff6f3d;
        }        
      } 
  }
  @media (max-width: 1150px) {  

    .heading-nav-item:before {
      display: none;
    }
  }
`;

export default StyledSelector;