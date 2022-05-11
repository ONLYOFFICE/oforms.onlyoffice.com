import { useState } from "react";
import { CloseButton, StyledMailPopup } from "./styled-mail-popup";
import Text from "@components/common/text";
import Button from "@components/common/button";
import Form from "./form";

const MailPopup = ({ t, language, active, setActive, submitForm, ...rest }) => {
  const [formComplete, setFormComplete] = useState(false);

  const ActiveForm = active ? (
    <StyledMailPopup active={active} onClick={() => setActive(false)} {...rest}>
      <div onClick={(e) => e.stopPropagation()} className="popup-content">
        <div className="PopupPanelCaptionItems">
          <div className="PopupPanelCaption">
            <Text
              className="popupPanelText"
              label={t("Don't Miss an Update!")}
            />
            <CloseButton onClick={() => setActive(false)} />
          </div>
          <div>
            {!formComplete ? (
              <Form t={t} setFormComplete={setFormComplete} />
            ) : (
              <div className="success">
                <div className="captchaDescription">
                  {t(
                    "We sent an email message with confirmation to your email address"
                  )}
                </div>
                <Button
                  typeButton="secondary"
                  type="submit"
                  isSubmit
                  className="button gray"
                  label={t("OK")}
                  onClick={() => setActive(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledMailPopup>
  ) : (
    <div />
  );

  return <>{ActiveForm}</>;
};

export default MailPopup;
