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
  background-color: white;

  .card-title {
    white-space: normal;
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
    display: block;
  }

  .card-subtitle {
    display: block;
    white-space: normal;
    margin-top: 3px;
    font-size: 13px;
    font-weight: normal;
    color: #808080;
    font-style: italic;
  }

  .card-link {
    display: block;
    margin-top: 8px;
  }

  .card-button {
    position: absolute;
    bottom: 24px;
    max-width: 208px;
    height: 48px;
  }

  @media (max-width: 768px) {
    /* box-sizing: content-box; */
    width: 208px;
    .card-button {
      width: 160px;
    }
    .card-title {
      -ms-text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      overflow: hidden;
      -ms-line-clamp: 2;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      display: -webkit-box;
      display: box;
      word-wrap: break-word;
      -webkit-box-orient: vertical;
      box-orient: vertical;
    }
  }

  @media (max-width: 375px) {
    width: 174px;
    padding: 16px;
    .card-button {
      width: 142px;
    }
  }
`;

export default StyledShortCard;
