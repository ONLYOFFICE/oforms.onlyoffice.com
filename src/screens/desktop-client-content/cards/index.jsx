import React, {useRef, useState} from "react";
import {CardsBox, CardsStyled, ToTopButton} from "./cards.styled";
import PropTypes from "prop-types";
import Card from "../card";
import Empty from "../empty";
import {ToTop} from "@icons";

const Cards = (props) => {
    const {items, onCardClick, onClear, isDark, topTop, toTopButtonActive, ...otherProps} = props;

    if (items.length === 0) {
        return <Empty onClear={onClear}/>
    }
    return (
        <CardsStyled {...otherProps}>
            {
                items.map(data => <Card key={data.id} data={data} onClick={onCardClick} isDark={isDark}/>)
            }
            <ToTopButton onClick={topTop} active={toTopButtonActive}>
                <ToTop/>
            </ToTopButton>
        </CardsStyled>
)
}

Cards.propTypes = {
    items: PropTypes.array,
    onCardClick: PropTypes.func,
    onClear: PropTypes.func,
    isDark: PropTypes.bool,
    topTop: PropTypes.func,
    toTopButtonActive: PropTypes.bool,
}
export default Cards;
