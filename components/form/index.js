import React from "react";
import PropTypes from "prop-types";

import StyledForm from "./styled-form";

import FormHeading from "./sub-components/form-heading";
import FormInput from "./sub-components/form-input";
import FormButton from "./sub-components/form-button";

import Separator from "../separator";
import Checkbox from "../checkbox";

const Form = (props) => {
  const { isPanel, formData, submitForm } = props;

  const onSubmitHandler = (e) => {
    submitForm(e);
  };

  const onKeyDownHandler = (e) => {
    if (e.which === 13) {
      onSubmitHandler(e);
    }
  };
  const formElements = [];

  formData.forEach((item, indx) => {
    switch (item.type) {
      case "heading":
        formElements.push(
          <FormHeading
            key={`${item.type}-${indx}`}
            item={item}
            isPanel={isPanel}
          />
        );
        break;
      case "input":
        formElements.push(
          <FormInput
            key={`${item.type}-${indx}`}
            item={item}
            isPanel={isPanel}
          />
        );
        break;
      case "checkbox":
        formElements.push(
          <Checkbox
            className="form-checkbox"
            key={`${item.type}-${indx}`}
            onChange={item.callback}
            isChecked={item.isChecked}
            label={item.label}
          />
        );
        break;
      case "button":
        formElements.push(
          <FormButton key={`${item.type}-${indx}`} item={item} />
        );
        break;
      case "separator":
        formElements.push(
          <Separator
            key={`${item.type}-${indx}`}
            className="form-separator"
            fontSize="14px"
            fontWeight="bold"
          >
            {item.separatorText}
          </Separator>
        );
        break;
      case "other":
        formElements.push(item.element);
        break;
      default:
        break;
    }
  });

  const itemsCount = formElements && formElements.length;

  return (
    <StyledForm
      {...props}
      itemsCount={itemsCount}
      onSubmit={onSubmitHandler}
      onKeyDown={onKeyDownHandler}
    >
      {formElements}
    </StyledForm>
  );
};

Form.propTypes = {
  /** To set view */
  isPanel: PropTypes.bool,
  /** Child components  */
  formData: PropTypes.arrayOf(PropTypes.object),
  /** Called when the onSubmit event occurs  */
  submitForm: PropTypes.func,
};

Form.defaultProps = {};

export default Form;
