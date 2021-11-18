import styled, { css } from "styled-components";
import { Base } from "../themes";

const panelStyle = css`
  border: ${(props) => props.theme.form.border};
  box-shadow: ${(props) => props.theme.form.boxShadow};
  max-width: 100%;
  background-color: white;
  grid-gap: 16px;

  .form-header {
    letter-spacing: -0.02em;
    text-align: "center";
  }

  .form-button {
    margin: 8px 0;
  }

  .form-input {
    margin-bottom: 8px;
  }

  .form-separator {
    margin-top: -2px;
    margin-bottom: 18px;
  }

  @media (max-width: 592px) {
    grid-gap: 16px;

    .form-header {
      margin-bottom: 2px;
    }

    .form-input {
      margin-bottom: 14px;
    }

    .form-separator {
      margin-top: 8px;
      margin-bottom: 22px;
    }

    .form-separator {
      margin-top: 5px;
      margin-bottom: 18px;
    }

    .form-button {
      margin-top: 0px;
    }
  } ;
`;

const StyledForm = styled.form`
  max-width: ${(props) => props.maxwidth || "544px"};
  margin: 0 auto;
  border-radius: ${(props) => props.theme.form.borderRadius};
  padding: ${(props) => props.theme.form.padding};

  background-color: transparent;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${(props) =>
    `repeat(${props.itemsCount}, 'min-content')`};

  grid-gap: ${(props) => (props.gap ? props.gap : "32px")};

  .to-hide-button {
    display: none;
  }

  .form-separator {
    margin-top: 6px;
    margin-bottom: -2px;
  }

  .form-header {
    text-align: center;
  }

  .form-button {
    font-size: 14px;
    letter-spacing: 0.01em;
  }

  @media (max-width: 1023px) {
    .form-header {
      margin-bottom: 1px;
    }
  }

  @media (max-width: 592px) {
    grid-gap: ${(props) => (props.gap ? props.gap : "24px")};
    .form-checkbox * {
      font-size: 13px;
    }

    border: unset;

    .form-button {
      height: 48px;
      margin: 0;
      font-size: 13px;
    }

    .form-input {
      margin: 0;
    }

    .to-hide-button {
      display: inline-block;
    }

    .form-separator {
      margin-top: -8px;
      margin-bottom: unset;
    }

    .form-header {
      font-size: 18px !important;
      margin-bottom: -8px;
    }
  }

  ${(props) => props.isPanel && panelStyle}
`;

StyledForm.defaultProps = {
  theme: Base,
};

export default StyledForm;
