import styled from "styled-components";

const StyledFilterItems = styled.div`
  padding: 0 0 12px;

  .pills-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border: 1px solid #ccdbfb;
    border-radius: 20px;
    background: #fff;
    cursor: pointer;
    transition:
      border-color 0.3s,
      background 0.3s,
      box-shadow 0.3s;

    &:hover {
      background: #ccdbfb;
      box-shadow: inset 0 0 4px 0 #709af1;
      border-color: transparent;

      .pill-label,
      .pill-count,
      .pill-more {
        color: #143481;
      }
    }

    &.active {
      border-color: #ccdbfb;
      background: #ccdbfb;
      box-shadow: none;

      .pill-label,
      .pill-count,
      .pill-more {
        color: #143481;
      }
    }
  }

  .pill-label {
    font-family: "Sora", sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    color: #3a3c49;
    white-space: nowrap;
  }

  .pill-count {
    font-family: "Sora", sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    color: #9092a6;
  }

  .pill-more {
    font-family: "Sora", sans-serif;
    font-size: 13px;
    color: #3a3c49;
    border-color: #ccdbfb;
    background: #fff;

    &:hover {
      background: #ccdbfb;
      box-shadow: inset 0 0 4px 0 #709af1;
      color: #143481;
    }
  }

  .show-less {
    display: inline-block;
    margin-top: 8px;
    background: none;
    border: none;
    font-family: "Sora", sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #3a3c49;
    cursor: pointer;
    text-decoration: underline;
    padding: 0;

    &:hover {
      color: #143481;
    }
  }

  &.variant-switch {
    .pill {
      padding: 6px 12px;
      border-radius: 24px;
      border-color: transparent;
      background: transparent;
      box-shadow: none;

      .pill-label {
        font-size: 14px;
        line-height: 1.5;
        color: #7a7d94;
      }

      &:hover {
        background: #ccdbfb;
        box-shadow: inset 0 0 4px 0 #709af1;
        border-color: transparent;

        .pill-label {
          color: #143481;
        }
      }

      &.active {
        background: #ccdbfb;
        box-shadow: none;
        border-color: transparent;

        .pill-label {
          color: #143481;
        }
      }
    }
  }
`;

export default StyledFilterItems;
