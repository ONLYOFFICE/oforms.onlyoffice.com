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

.box-doc-info-template {
    padding: 25px 0;
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 1fr 3fr;
    .box-doc-info {
        display: flex;
        max-width: 832px;
        justify-content: space-between;
    }
}

.idk-box-template {
    display: flex;
    .checkbox-card-group {
        width: 100%;
    }
}

.checkbox-card {
    padding: 10px;
}

@media(max-width: 1024px) {
    .box-doc-info-template {
        display: none;
    }

    .checkbox-card-group {
        display: none;
    }
}

@media(max-width: 768px) {
    .heading-cards {
        font-size: 32px;
    }
}

@media(max-width: 600px) {
    .heading-cards {
        font-size: 24px;
        padding-bottom: 40px;
        padding-top: 16px;
    }
    .idk-box-template {
        justify-content: center;
        }
    }
}


@media(max-width: 450px) {
    .box-cards-template {
        justify-content: center;
    } 
}

`;

export default StyledMainContent;