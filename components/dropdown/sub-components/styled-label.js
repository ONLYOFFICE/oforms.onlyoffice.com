import styled from "styled-components";

const StyledLabel = styled.div`
.dropdownLabel{
    color: gray;
    cursor: pointer;
    font-size: 11px;
    line-height: 133%;
    font-weight: 600;
    letter-spacing: 0.02em;
    padding-right: 8px;
    text-transform: uppercase;
}

.dropdownHead{
    display: inline;
    cursor: pointer;
}

.caret-down svg{
    width: 24px;
    height: 24px;
}
`;

export default StyledLabel;