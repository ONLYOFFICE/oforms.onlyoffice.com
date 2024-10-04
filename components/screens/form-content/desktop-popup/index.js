import StyledDesktopPopup from "./styled-desktop-popup";
import Heading from "@components/common/heading";
import Text from "@components/common/text";
import InternalLink from "@components/common/internal-link";

const DesktopPopup = ({ t, locale, popupActive, setPopupActive }) => {
  return (
    <StyledDesktopPopup onClick={() => setPopupActive(false)} className={popupActive ? "show": ""}>
      <div className="popup-container">
        <div onClick={(e) => e.stopPropagation()} className="popup-wrapper">
          <button onClick={() => setPopupActive(false)} className="popup-close-btn">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.78497 5.2945C5.39445 5.68502 5.39077 6.32186 5.78129 6.71239L11.0689 12L11.069 12.0001L5.78138 17.2877C5.39086 17.6782 5.39454 18.3151 5.78506 18.7056C6.17559 19.0961 6.81243 19.0998 7.20295 18.7093L12.4906 13.4217L17.7782 18.7093C18.1687 19.0998 18.8055 19.0961 19.1961 18.7056C19.5866 18.3151 19.5903 17.6782 19.1997 17.2877L13.9121 12.0001L13.9122 12L19.1998 6.71239C19.5903 6.32186 19.5867 5.68502 19.1961 5.2945C18.8056 4.90397 18.1688 4.90029 17.7782 5.29082L12.4906 10.5785L12.4906 10.5785L12.4905 10.5785L7.20287 5.29082C6.81234 4.90029 6.1755 4.90397 5.78497 5.2945Z" fill="#808080"/>
            </svg>
          </button>

          <div className="popup-body">
            <Heading className="popup-heading" level={4} label={t("ONLYOFFICE Desktop Editors not installed")} />
            <Text className="popup-text" dangerouslySetInnerHTML={{__html: t("Please download it and install to use this plugin. Go to the Download page to get ONLYOFFICE Desktop Editors for Windows, Linux, or macOS.")}} />
            <InternalLink id="popup-btn" className="popup-btn" href={`https://www.onlyoffice.com${locale === "en" ? "" : `/${locale}`}/download-desktop.aspx`} label={t("Get ONLYOFFICE desktop")} />
          </div>
        </div>
      </div>
    </StyledDesktopPopup>
  );
};

export default DesktopPopup;