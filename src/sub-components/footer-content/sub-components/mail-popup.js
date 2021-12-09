import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyledMailForm, CloseButton, StyledMailPopup } from "./styled-mail-popup";
import Text from "../../../../components/text";
import Portal from "../../../../components/portal";
import TextInput from "../../../../components/text-input";
import Button from "../../../../components/button";

const MailPopup = ({
    t,
    language,
    active,
    setActive,
    submitForm,
    ...rest
}) => {

    const [nameValue, setNameValue] = useState("");
    const [nameIsValid, setNameIsValid] = useState(true);
    const [nameIsEmpty, setNameIsEmpty] = useState(true);
    const [nameIsIncorrect, setNameIsIncorrect] = useState(true);
    const [errorTextInput, setErrorTextInput] = useState(null);


    const [emailValue, setEmailValue] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [emailIsEmpty, setEmailIsEmpty] = useState(true);
    const [emailIsIncorrect, setEmailIsIncorrect] = useState(true);
    const [errorMailInput, setErrorMailInput] = useState(null);
    const [emailIsExist, setEmailIsExist] = useState(false);

    const onKeyDownHandler = (e) => {
        if (e.which === 13) {
            onSubmitHandler(e);
        }
    };

    const onTextChangeHandler = (e, isValid) => {
        setNameValue(e.target.value)
        setNameIsValid(isValid);
    };

    const onEmailChangeHandler = (e, isValid) => {
        setEmailValue(e.target.value);
        setEmailIsValid(isValid);
        setEmailIsExist(false);
    };



    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("ok");
        let hasError = false;

        if (!nameValue.trim().length <= 3) {
            hasError = true;
            setNameIsEmpty(true);
            setErrorTextInput(t("AuthErrorIndicationText"));
            setNameIsValid(true);
        } else {
            setNameIsEmpty(false);
            setNameIsValid(false);
        }

        if (!emailValue.trim()) {
            hasError = true;
            setEmailIsValid(false);
            setEmailIsEmpty(true);
            setErrorMailInput(t("AuthErrorIndicationText"));
        } else {
            setEmailIsEmpty(false);
        }

        if (emailValue.trim() && !emailIsValid) {
            hasError = true;
            setEmailIsValid(false);
            setEmailIsIncorrect(true);
            setErrorMailInput(t("AuthErrorIndicationIncorrectEmail"));
        } else {
            setEmailIsIncorrect(false);
        }

        if (hasError) return false;
    };

    return (
        <Portal>
            <StyledMailPopup
                active={active}
                onClick={() => setActive(false)}
                {...rest}
            >
                <div
                    onClick={e => e.stopPropagation()}
                    className="popup-content"
                >
                    <Text className="PopupPanelCaption">
                        {/* Don't Miss an Update! */}
                        <CloseButton onClick={() => setActive(false)} />
                    </Text>
                    <div className="dataForm">
                        <StyledMailForm
                            onSubmit={onSubmitHandler}
                            onKeyDown={onKeyDownHandler}
                            formData={[
                                {
                                    type: "heading",
                                    headingText: "Don't Miss an Update!",
                                    isHeader: true,
                                },
                                {
                                    type: "other",
                                    element: <Text className="captchaDescription">Get the latest ONLYOFFICE news delivered to your inbox</Text>
                                },
                                {
                                    type: "input",
                                    inputType: "text",
                                    placeholder: "First name",
                                    callback: onTextChangeHandler,
                                    value: nameValue,
                                    isError: (!nameIsEmpty),
                                    errorText: errorTextInput,
                                    height: "36px",
                                    tabIndexProp: 0,
                                },
                                {
                                    type: "other",
                                    element: ({ errorTextInput } ? <Text height="12px" className="errorNameText">{errorTextInput}</Text> : null)
                                },
                                {
                                    type: "input",
                                    inputType: "email",
                                    placeholder: "Your email",
                                    callback: onEmailChangeHandler,
                                    isError:
                                        (emailIsEmpty && !emailIsValid) ||
                                        (emailIsIncorrect && !emailIsValid) ||
                                        emailIsExist,
                                    value: emailValue,
                                    tabIndexProp: 0,
                                    height: "36px",

                                },
                                {
                                    type: "other",
                                    element: ({ errorMailInput } ? <Text height="12px" className="errorMailText">{errorMailInput}</Text> : null)
                                },
                                {
                                    type: "button",
                                    typeButton: "primary",
                                    isSubmit: true,
                                    toHideButton: false,
                                    label: "Subscribe",
                                    buttonClick: onSubmitHandler,
                                },
                            ]}
                        />

                        {/* <Text className="captchaDescription">Get the latest ONLYOFFICE news delivered to your inbox</Text>
                        <div className="dataItem">
                            <TextInput
                                value={value}
                                onChange={(event) => isValue(event.target.value)}
                                placeholder="First name"
                                tabIndex="1"
                                type="text"
                            />
                            <div id="firstNameErrorMessage" className="dataFormError">First name is empty.</div>
                        </div>
                        <div className="dataItem">
                            <TextInput
                                value={value}
                                onChange={(event) => isValue(event.target.value)}
                                placeholder="Your email"
                                tabIndex="2"
                                type="text"
                            />
                            <div id="emailErrorMessage" className="dataFormError">Email is empty.</div>
                        </div>
                        <div className="progressPanel">
                            <Button
                                typeButton="primary"
                                type="submit"
                                className="button red"
                                id="subscriptionFinishButton"
                                label="Subscribe"
                                onclick="SendSubscriptionFunction(); return false;" />
                        </div> */}
                    </div>
                    <div className="success">
                        <div className="captchaDescription">We sent an email message with confirmation to your email address.</div>
                        <Button
                            typeButton="secondary"
                            type="submit"
                            className="button gray"
                            label="OK"
                            onclick="CloseSubscriptionsDialog(); return false;" />
                    </div>
                </div>
            </StyledMailPopup>
        </Portal>
    );
}

MailPopup.propTypes = {
    /** */
    active: PropTypes.bool,
    /** */
    setActive: PropTypes.func,
    /** What the will trigger when clicked */
    onClick: PropTypes.func,
    /** Accepts CSS style */
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    /** Tab index */
    tabIndex: PropTypes.number,
    /** Accepts id */
    id: PropTypes.string,
    /** Accepts class */
    className: PropTypes.string,
}

MailPopup.defaultProps = {

};

export default MailPopup;