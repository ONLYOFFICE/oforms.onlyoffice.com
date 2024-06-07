import StyledDesktopPopup from "./styled-desktop-popup";
import { ReactSVG } from "react-svg";
import Heading from "@components/common/heading";
import Text from "@components/common/text";
import InternalLink from "@components/common/internal-link";

const DesktopPopup = ({ t, locale, popupActive, setPopupActive }) => {
  return (
    <StyledDesktopPopup onClick={() => setPopupActive(false)} className={popupActive ? "show": ""}>
      <div className="popup-container">
        <div onClick={(e) => e.stopPropagation()} className="popup-wrapper">
          <button onClick={() => setPopupActive(false)} className="popup-close-btn">
            <ReactSVG src="/icons/cross.svg" />
          </button>

          <div className="popup-body">
            <Heading className="popup-heading" level={4} label={t("ONLYOFFICE Desktop Editors not installed")} />
            <Text className="popup-text" dangerouslySetInnerHTML={{__html: t("Please download it and install to use this plugin. Go to the Download page to get ONLYOFFICE Desktop Editors for Windows, Linux, or macOS.")}} />
            <InternalLink className="popup-btn" href={`https://www.onlyoffice.com/${locale === "en" ? "" : locale}/download-desktop.aspx`} label={t("Get ONLYOFFICE desktop")} />
          </div>
        </div>
      </div>
    </StyledDesktopPopup>
  );
};

export default DesktopPopup;