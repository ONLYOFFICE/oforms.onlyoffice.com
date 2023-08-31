import styled, {css} from "styled-components";

export const CategorySelectorDropdown = styled.div`
  position: absolute;
  min-width: 291px;
  z-index: 2;
  left: -26px;
  top: calc(100% + 18px);
  background-color: ${({theme}) => theme.colors.palette.backgroundNormal};
  border-radius: 0px 0px 6px 6px;
  padding: 16px 0;
  box-shadow: ${({theme}) => theme.boxShadows.shadowMenu};
  display: flex;
  flex-direction: column;
  border: 1px solid ${({theme}) => theme.colors.palette.borderToolbarButtonHover};

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 18px;
    top: -18px;
    left: 0;
    background-color: transparent;
  }
}

@media (max-width: 1150px) {
  .heading-nav-item:before {
    display: none;
  }
}
`;
