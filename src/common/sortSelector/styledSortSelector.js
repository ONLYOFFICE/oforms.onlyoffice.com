import styled from "styled-components";

export const SortSelectorIcon = styled.span`
  cursor: pointer;
  display: flex;
  svg {
    color: ${({theme}) => theme.colors.palette.iconNormal};
  }
`

export const SortSelectorHeader = styled.div`
  display: flex;
  align-items: center;
`;