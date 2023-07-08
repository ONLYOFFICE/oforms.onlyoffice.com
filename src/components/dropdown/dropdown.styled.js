import styled from "styled-components";
import {createGlobalStyle} from "styled-components";

export const DropdownWrapper = styled.div``;

export const DropdownGlobalStyles = createGlobalStyle`
  .dropdown-component__overlay {
    position: absolute;
    z-index: 1;
  }
  
  .dropdown-component__overlay-hidden {
    display: none;
  }
`
