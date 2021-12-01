import React from "react";

import Styled404 from "./styled";

import Text from "../../../components/text";
import Button from "../../../components/button";
import InternalLink from "../../../components/internal-link";

const Error404 = ({
    t,
    ...rest
}) => {
    return (
        <Styled404 {...rest}>
            <img src="/icons/bg-errors.react.svg" className="page-error-404-image" />
            <div className="page-error-404-container">
                <Text className="page-error-404-heading"
                    label={t("404 Error!")}
                />
                <Text className="page-error-404-description"
                    label={t("It seems you clicked on an invalid link, or entered an address that is not on this website")}
                />
                <InternalLink className="page-error-404-btn" href="/">
                    <Button label={t("GO TO HOME PAGE")} />
                </InternalLink>
            </div>
        </Styled404>
    );
};

export default Error404;