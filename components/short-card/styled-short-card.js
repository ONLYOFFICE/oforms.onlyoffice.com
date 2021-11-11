import styled from "styled-components";

const StyledShortCard = styled.div`
box-sizing: border-box;
display: block;
position: relative;
width: 256px;
height: 244px;
box-shadow: 0px 7px 15px rgba(85, 85, 85, 0.1);
border-radius: 5px;
padding: 24px;

    .title{
        white-space: normal;
    }
    .subtitle{
        display: block;
        white-space: normal;
        margin-top: 3px;
    }
    .link{
        display: block;
        margin-top: 8px;
    }
    .button{
        position: absolute;
        bottom: 24px;
        max-width: 208px;
    }

@media (max-width: 768px){
    width: 208px;
        .button {
            width: 160px;
        }
}

@media (max-width: 375px){
    width: 174px;
    padding: 16px;
        .button {
            width: 142px;
        }
}
`;

export default StyledShortCard;