import styled from "styled-components";

export const StyledEmpty = styled.div`
  width: 100%;
  padding: 112px 0 0;
  
  display: grid;
  grid-template-areas: "img title" "img desc" "img clear";
  grid-template-columns: max-content max-content;
  justify-content: center;
  column-gap: 24px;
  
  .empty__img {
    grid-area: img;
  }

  .empty__title {
    color: ${({theme}) => theme.colors.palette.textNormal};
    font-weight: 700;
    font-size: 18px;
    line-height: 133%;
    grid-area: title;
    margin-bottom: 12px;
  }

  .empty__desc, .empty__clear {
    color: ${({theme}) => theme.colors.palette.textSecondary};
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    grid-area: desc;
  }
  
  .empty__clear {
    text-decoration: underline;
    cursor: pointer;
    grid-area: clear;
  }
`