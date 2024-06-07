import styled from "styled-components";

const StyledShortCard = styled.div`
  width: 148px;
  min-width: 148px;

  .card-preview {
    display: block;
    border: 1px solid #E2E2E2;
    border-radius: 3px;
    margin-bottom: 16px;
    padding: 8px;
    background-color: #FFFFFF;
    transition: box-shadow 0.3s;
  }

  .card-img {
    position: relative;
    display: block;
    padding-bottom: 62.967%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }

  .card-title {
    display: block;
    font-size: 14px;
    font-weight: 700;
    line-height: 19px;
    color: #444444;
    transition: color 0.3s;
  }

  &:hover {
    .card-preview {
      box-shadow: 0px 7px 15px 0px rgba(85, 85, 85, 0.1);
    }

    .card-title {
      color: #FF6F3D;
    }
  }
`;

export default StyledShortCard;
