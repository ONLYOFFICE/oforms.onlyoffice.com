import StyleTextInput from "./styled-text-input";
import PropTypes from "prop-types";

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
          <svg className="search-icon" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.537067 8.06817C0.941231 12.1003 4.54352 15.0419 8.58301 14.6385C9.46129 14.5508 10.2879 14.3122 11.0397 13.951C11.458 13.75 11.9661 13.8015 12.2949 14.1292L17.482 19.2983C17.8715 19.6865 18.5014 19.6873 18.8919 19.3001L19.7857 18.4139C20.1795 18.0234 20.1803 17.387 19.7874 16.9955L14.6218 11.8477C14.2889 11.5159 14.2388 10.9999 14.4471 10.5786C15.0353 9.38863 15.3074 8.02497 15.1654 6.60736C14.7612 2.57526 11.1589 -0.366397 7.1194 0.0369948C3.07991 0.440386 0.132902 4.03607 0.537067 8.06817ZM2.62682 7.85949C2.91551 10.7396 5.48858 12.8407 8.37393 12.5526C11.2593 12.2645 13.3643 9.69613 13.0756 6.81605C12.7869 3.93598 10.2138 1.83479 7.32849 2.12293C4.44314 2.41107 2.33813 4.97941 2.62682 7.85949Z" fill="#AAAAAA"/>
          </svg>
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
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.78497 5.2945C5.39445 5.68502 5.39077 6.32186 5.78129 6.71239L11.0689 12L11.069 12.0001L5.78138 17.2877C5.39086 17.6782 5.39454 18.3151 5.78506 18.7056C6.17559 19.0961 6.81243 19.0998 7.20295 18.7093L12.4906 13.4217L17.7782 18.7093C18.1687 19.0998 18.8055 19.0961 19.1961 18.7056C19.5866 18.3151 19.5903 17.6782 19.1997 17.2877L13.9121 12.0001L13.9122 12L19.1998 6.71239C19.5903 6.32186 19.5867 5.68502 19.1961 5.2945C18.8056 4.90397 18.1688 4.90029 17.7782 5.29082L12.4906 10.5785L12.4906 10.5785L12.4905 10.5785L7.20287 5.29082C6.81234 4.90029 6.1755 4.90397 5.78497 5.2945Z" fill="#808080"/>
            </svg>
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