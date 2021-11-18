import styled from "styled-components";

const StyledCards = styled.div`
display: grid;
grid-auto-rows: auto;
grid-template-columns: 1fr 1fr 1fr;
max-width: 832px;
gap: 32px;
row-gap: 64px;

@media(max-width: 768px) {
    max-width: 688px;
    gap: 24px;
}

@media(max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    max-width: 344px;
    gap: 8px;
    margin: 0 auto;
}

@media(max-width: 425px) {
    grid-template-columns: 1fr;
    max-width: 290px;
    gap: 64px;
}
`;

export default StyledCards;