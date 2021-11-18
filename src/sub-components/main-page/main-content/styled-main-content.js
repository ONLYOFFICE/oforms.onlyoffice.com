import styled from "styled-components";
import Section from "../../section";

const StyledMainContent = styled(Section)`
.heading-cards {
    padding-bottom: 50px;
    padding-top: 80px;
}

.tempalates-cards-items {
    max-width: 832px;
}

.tempalates-buttons-items {
    margin-top: 50px;
}



@media(max-width: 450px) {
    .box-cards-template {
        justify-content: center;
    } 
}

`;

export default StyledMainContent;