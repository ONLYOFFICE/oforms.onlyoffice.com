import styled from "styled-components";

export const NotFoundForWebsiteStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${({theme}) => theme.colors.palette.backgroundNormal};


  .not-found__title {
    font-weight: 700;
    font-size: 40px;
    line-height: 53px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #333333;
    margin: 0.67em 0;
  }
  
  .not-found__desc {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #555555;
    max-width: 510px;
  }
  
  .not-found__link {
    text-decoration: none;
    padding: 20px 26px;
    margin: 24px auto 0 auto;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #fff;
    border-radius: 3px;
    background-color: #ff6f3d;
    width: max-content;
    cursor: pointer;
  }
`

export const NotFoundForDesktopStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${({theme}) => theme.colors.palette.backgroundNormal};

  .not-found__title {
    font-weight: 700;
    font-size: 18px;
    line-height: 133%;
    color: ${({theme}) => theme.colors.palette.textNormal};
    letter-spacing: -0.02em;
    grid-area: title;
  }

  .not-found__link {
    cursor: pointer;
    color: ${({theme}) => theme.colors.palette.textSecondary};
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    grid-area: link;
    text-decoration: underline;
  }
  
  .not-found__illustration {
    grid-area: img;
  }
`

export const NotFoundForDesktopBox = styled.div`
  display: grid;
  grid-template-areas: "img title" "img link";
  align-items: flex-start;
  column-gap: 20px;
`;

export const NotFoundForWebsiteIllustration = styled.div`
  background-image: url("https://static-oforms.onlyoffice.com/icons/bg-errors.svg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 518px;
  height: 424px;
`