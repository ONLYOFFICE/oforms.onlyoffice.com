import React from "react";
import PropTypes from "prop-types";

import Text from "../../text";
import Link from "../../link";
import Button from "../../button";
import StyledShortCard from "./styled-short-card";
import {useTranslation} from "next-i18next";

const ShortCard = ({title, subtitle, linkUrl, hrefButtom, alt}) => {
    const { t } = useTranslation('common')
    return (
        <StyledShortCard>
            <Text className="card-title" label={title}/>
            <Text className="card-subtitle" label={subtitle}/>
            <Link
                className="card-link"
                target="_self"
                label={t("LearnMore")}
                href={linkUrl}
                alt={alt}
            />
            <Link href={hrefButtom} alt="Open Form">
                <Button
                    className="card-button"
                    label={t("Open")}
                    typeButton="transparent"
                    isScale
                />
            </Link>
        </StyledShortCard>
    );
};

ShortCard.propTypes = {
    /** Array items */
    array: PropTypes.array,
    /** Link tab index */
    tabIndex: PropTypes.number,
    /** Accepts id */
    id: PropTypes.string,
    /** Accepts class */
    className: PropTypes.string,
};

export default ShortCard;
