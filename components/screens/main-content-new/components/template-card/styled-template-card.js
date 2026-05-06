import styled from "styled-components";

const FORMAT_COLORS = {
  xlsx: { hoverBg: "rgb(225, 251, 243)", hoverBorder: "rgb(189, 207, 210)" },
  pdf: { hoverBg: "rgb(251, 237, 241)", hoverBorder: "rgb(207, 199, 210)" },
  docx: { hoverBg: "rgb(234, 241, 254)", hoverBorder: "rgb(189, 195, 211)" },
  pptx: { hoverBg: "rgb(255, 248, 245)", hoverBorder: "rgb(202, 199, 206)" },
};

const StyledTemplateCard = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .card-link {
    display: flex;
    flex-direction: column;
    color: inherit;
    text-decoration: none;
  }

  .card-preview {
    position: relative;
    aspect-ratio: 284 / 219;
    background: #fff;
    border: 1px solid rgba(122, 125, 148, 0.4);
    border-radius: 3px;
    overflow: hidden;
    transition:
      background 0.2s,
      border-color 0.2s;
  }

  .preview-thumb {
    position: absolute;
    top: 14px;
    left: 14px;
    right: 14px;
    bottom: 44px;
    overflow: hidden;
    background-color: #ffffff;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
  }

  .format-badge {
    position: absolute;
    display: block;
    transition: opacity 0.2s;
  }

  .format-badge--default {
    left: 14px;
    bottom: 14px;
    width: 42px;
    height: 20px;
  }

  .format-badge--hover {
    left: 10.5px;
    bottom: 10.5px;
    width: 49px;
    height: 27px;
    opacity: 0;
    pointer-events: none;
  }

  .card-body {
    padding: 24px 0 0;
  }

  .card-title {
    font-family: "Sora", sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #494b5b;
    margin: 0 0 8px;
    line-height: 1.4em;
  }

  .card-description {
    font-family: "Sora", sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #494b5b;
    line-height: 1.5em;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &:hover {
    .card-preview {
      background: ${({ $format }) =>
        FORMAT_COLORS[$format]?.hoverBg ?? "#f3f4f8"};
      border-color: ${({ $format }) =>
        FORMAT_COLORS[$format]?.hoverBorder ?? "#d0d3e0"};
    }

    .format-badge--default {
      opacity: 0;
    }

    .format-badge--hover {
      opacity: 1;
    }
  }
`;

export default StyledTemplateCard;
