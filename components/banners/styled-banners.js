import styled from "styled-components";

const StyledBanners = styled.div`
display: flex;
 box-sizing: border-box;
    max-width: 1120px;
    min-height: 250px;
    border: 1px solid #008078;
    justify-content: space-between;
    border-radius: 3px;
    padding: 48px 60px;
    margin: 0 auto;
    .description {
        white-space: normal;
        color: #fff;
    }

    .banner_heading {
        padding-left: 12px;
    }

    #btn-type {
        color: white;
        border-color: white;
    }

    .box-banner-sec {
        padding-bottom: 15px;
      }

    .banner_buttons {               
        margin-top: 24px;
    }

    .buttons {        
        margin: 0 5px;
    }
    
     @media (max-width: 500px) {   

    .banner_buttons {
     flex-direction: column-reverse;
    }
    .buttons {        
        margin: 5px 0;
    }
  } 

  @media (max-width: 768px) {
      max-width: 668px;
      flex-direction: column;
      .box-banner {
        align-items: center;
      }

      .box-banner-sec {
        flex-direction: column;
      }
  }

  @media (max-width: 500px) {
      max-width: 336px;
      padding: 32px 27px;

        .banner_heading {
            font-size: 18px;
            padding-bottom: 16px;
        }

        .link {
          width: 100%;
        }

        .banner_buttons {
            flex-direction: column;    
        }  

        .buttons {
            width: 100%;
        }        
  }

  @media (max-width: 320px) {
      max-width: 288px;
      padding: 32px 16px;             
  }
`;

export default StyledBanners;