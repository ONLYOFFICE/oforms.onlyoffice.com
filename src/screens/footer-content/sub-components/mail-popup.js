import { useState } from "react";
import { CloseButton, StyledMailPopup } from "./styled-mail-popup";
import Text from "@common/text";
import Button from "@common/button";
import Form from "./form";
import {useTranslation} from "next-i18next";

const MailPopup = ({ language, active, setActive, submitForm, ...rest }) => {
  const [formComplete, setFormComplete] = useState(false);
  const { t } = useTranslation('common ')

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
              <Form setFormComplete={setFormComplete} />
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
