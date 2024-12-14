import styled from "styled-components";
import Link from "next/link";

const StyledEditorCard = styled(Link)`
  box-sizing: border-box;
  border: 1px solid #666666;
  padding: 40px 22px;
  color: #ffffff;
  min-width: 196px;
  background-color: #444444;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #FF6F3D;
  }

  .editor-card-img {
    margin: 0 auto 24px;
    width: 100%;
    min-width: 150px;
    max-width: 150px;
    height: 94px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .editor-card-title {
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

export default StyledEditorCard;
