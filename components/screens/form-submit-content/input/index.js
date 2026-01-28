import StyledInput from "./styled-input";
import Text from "@components/common/text";

const Input = ({ isTextarea, label, id, className, name, autoComplete, value, placeholder, onFocus, onChange, onBlur, errorText }) => {
  return (
    <StyledInput>
      <label className="label" htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        {isTextarea ? (
          <textarea
            id={id}
            className={className}
            name={name}
            autoComplete={autoComplete}
            value={value}
            placeholder={placeholder}
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
          />
        ) : (
          <input
            id={id}
            className={className}
            name={name}
            autoComplete={autoComplete}
            value={value}
            placeholder={placeholder}
            onFocus={onFocus}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
        {errorText && 
          <Text className="error-text" label={errorText} as="p" />
        }
      </div>
    </StyledInput>
  );
};

export default Input;