import React from "react";
import PropTypes from "prop-types";

import {CardImage, CardStyled, CardTitle} from "./card.styled";

const Card = (props) => {
    const {onClick, data, isDark} = props;


    const img = data.attributes.card_prewiew?.data?.attributes?.url;
    const name = data.attributes.name_form;
    return (
        <CardStyled onClick={(e) => onClick(e, data)} isDark={isDark}>
            <CardImage
                src={img}
                alt={name}
            />
            <CardTitle>{name}</CardTitle>
        </CardStyled>
    )
}

Card.propTypes = {
    onClick: PropTypes.func,
    data: PropTypes.object,
    isDark: PropTypes.bool,
}

export default Card;
