import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 3px;
  padding: 19px 24px;
  font-size: 13px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0.04em;
  height: 56px;
  color: #FFFFFF;
  background-color: ${(props) => props.$typeButton === "secondary" ? "#444444" : "#FF6F3D"};
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.$typeButton === "secondary" ? "#555555" : "#FF865C"};
  }

  &:active {
    background-color: ${(props) => props.$typeButton === "secondary" ? "#444444" : "#FF6F3D"};
  }

  &:disabled {
    cursor: default;
    background-color: ${(props) => props.$typeButton === "secondary" ? "#C7C7C7" : "#FFD4C5"};
  }
`;

export default StyledButton;
