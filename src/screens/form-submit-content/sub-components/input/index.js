import StyledInput from "./styled-input";
import Text from "@common/text";

const Input = ({ isTextarea, label, className, name, value, placeholder, onFocus, onChange, onBlur, errorText }) => {
  return (
    <StyledInput>
      <Text className="label" label={label} />
      <div className="input-wrapper">
        {
          isTextarea ?
            <textarea
              className={className}
              name={name}
              value={value}
              placeholder={placeholder}
              onFocus={onFocus}
              onChange={onChange}
              onBlur={onBlur}
            />
          :
            <input
              className={className}
              name={name}
              value={value}
              placeholder={placeholder}
              onFocus={onFocus}
              onChange={onChange}
              onBlur={onBlur}
            />
        }
        {errorText && <Text className="error-text">{errorText}</Text>}
      </div>
    </StyledInput>
  );
};

export default Input;