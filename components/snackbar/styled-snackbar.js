import styled from "styled-components";

const SnackBar = styled.div`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  position: fixed;
  min-height: 40px;
  width: 544px;
  bottom: 12px;
  box-sizing: border-box;
  z-index: 100;

  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "rgba(249,249,249,0.95)"};
  box-shadow: 0px 7px 15px rgb(85 85 85 / 10%);
  border: 1px solid #ccc;
  border-radius: 5px;
  align-items: center;
  margin-right: -272px;
  right: 50%;
  padding: 16px;

  @media (max-width: 592px) {
    width: 100%;
    margin: unset;
    right: 0;
    bottom: 0;
    border-radius: 0;
  }
`;

export default SnackBar;
