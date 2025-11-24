import { forwardRef } from "react";
import {
  StyledCheckbox,
  StyledCheckboxInput,
  StyledCheckboxIcon,
  StyledCheckboxLabel,
} from "./styled-checkbox";

const Checkbox = forwardRef(
  (
    {
      id,
      className,
      label,
      tabIndex,
      checked,
      required,
      name,
      value,
      align = "top",
      size,
      disabled,
      onChange,
      ...rest
    },
    ref,
  ) => {
    return (
      <StyledCheckbox $align={align} $disabled={disabled}>
        <StyledCheckboxInput
          ref={ref}
          id={id}
          className={className}
          type="checkbox"
          tabIndex={tabIndex}
          checked={checked}
          required={required}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />
        <StyledCheckboxIcon $checked={checked} />
        <StyledCheckboxLabel $size={size}>{label}</StyledCheckboxLabel>
      </StyledCheckbox>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;