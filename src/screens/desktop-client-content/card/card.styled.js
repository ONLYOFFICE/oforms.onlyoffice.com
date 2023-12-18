import styled, {css} from "styled-components";

export const CardStyled = styled.li`
  width: 186px;
  min-height: 262px;
  cursor: pointer;

  img {
    transition: opacity 100ms ease-in-out, filter 100ms ease-in-out;
    ${({isDark}) => isDark ? 'opacity: 0.9' : undefined}
  }

  &:hover {
    img {
      ${({isDark}) => {
        if (isDark) return css`
          opacity: 1;
        `

        return css`
          filter: drop-shadow(rgba(0, 0, 0, 0.2) 0px 2px 5px);
        `
      }}
    }
  }
`

export const CardImage = styled.img`
  width: 100%;

  border: 1px solid ${({theme}) => theme.colors.palette.borderToolbar};
`

export const CardTitle = styled.h4`
  margin: 0;
  color: ${({theme}) => theme.colors.palette.iconNormal};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  padding: 12px;

  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const CardFakeImgForLoading = styled.img`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;

  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
`
