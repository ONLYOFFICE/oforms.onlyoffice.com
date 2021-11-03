import styled from "styled-components";


const StyledBanner = styled.div`
    max-width: 1120px;
    max-height: 250px;
    border: 1px solid #E2E2E2;
    box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
    border-radius: 3px;
    padding: 48px 60px;
    margin: 0 auto;

    .description {
        white-space: normal;
    }

    .banner_buttons{               
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
  
  
`;





export default StyledBanner;
