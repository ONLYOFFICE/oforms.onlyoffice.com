import styled from "styled-components";

const StyledCard = styled.div`
  width: 186px;
  cursor: pointer;

  .card-img {
    border: 1px solid ${props =>
      props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "#616161" : 
      "#CBCBCB"
    };
    width: 186px;
    height: 260px;
    object-fit: cover;
    ${props => (props.theme === "theme-dark" || props.theme === "theme-contrast-dark") && "opacity: 0.9;"}
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  .card-title {
    padding: 12px 9px;
    font-size: 14px;
    line-height: 21px;
    font-weight: 400;
    text-align: center;
    color: ${props =>
      props.theme === "theme-light" ? "rgba(0, 0, 0, 0.8)" :
      props.theme === "theme-dark" ? "rgba(255, 255, 255, 0.8)" :
      props.theme === "theme-contrast-dark" ? "#E8E8E8" : 
      "#444444"
    };
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }

  &:hover {
    .card-img {
      border-color: #E0E0E0;
      border-color: ${props =>
        props.theme === "theme-dark" || props.theme === "theme-contrast-dark" ? "#616161" : 
        "#E0E0E0"
      };
      box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
  }
`
export default StyledCard;