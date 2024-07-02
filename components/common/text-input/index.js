import StyleTextInput from "./styled-text-input";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";

const TextInput = ({
    label,
    placeholder,
    className,
    type,
    value,
    errorText,
    searchIcon,
    inputClearBtn,
    onClick,
    onFocus,
    onChange,
    onKeyDown,
    handlerClearValue
  }) => {

  return (
    <StyleTextInput className="text-input" searchIcon={searchIcon} label={label}>
      <div className="text-input-container">
        {searchIcon &&
          <ReactSVG className="search-icon" src="/icons/search-input.svg" />
        }
        <input
          onClick={onClick}
          onFocus={onFocus}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className={`input ${className} ${value?.length > 0 ? "focus" : ""}`}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        {label &&
          <label className="label">{label}</label>
        }
        {inputClearBtn && value?.length > 0 &&
          <button onClick={handlerClearValue} className="input-btn">
            <ReactSVG src="/icons/cross.svg" />
          </button>
        }
      </div>
      {errorText && 
        <p className="error-text">{errorText}</p>
      }
    </StyleTextInput>
  );
};

TextInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  searchIcon: PropTypes.bool,
  inputClearBtn: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  handlerClearValue: PropTypes.func
};

TextInput.defaultProps = {
  type: "text",
  inputClearBtn: true
};

export default TextInput;