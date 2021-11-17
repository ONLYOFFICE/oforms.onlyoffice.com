import styled from "styled-components";

const StyledCard = styled.div`
display: flex;
flex-direction: column;
justify-items: stretch;
max-width: 256px;
max-height: 576px;
background-color: #F9F9F9;

.image-template {
    max-width:254px;
    border: 1px solid #E2E2E2;
    border-bottom: none;
}

.card-template {
    background-color: #F9F9F9;
    border: 1px solid #E2E2E2;
    padding: 24px 24px 10px 24px;
    max-height: 239px;
}

.title-template {
    padding-bottom: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.subtitle-template {
    padding-bottom: 24px;
    max-height: 42px;
    height: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.redactor-btn-template {
    margin-bottom: 0px;
}

.download-btn-template {
    background-color: transparent;
}

@media(max-width: 768px) {
    max-width: 214px;
    max-height: 552px;
    .image-template {
        max-width:212px;
    }
}

@media(max-width: 425px) {
    max-width: 288px;
    max-height: 584px;
    .image-template {
        max-width:286px;
    }
}
`;

export default StyledCard;