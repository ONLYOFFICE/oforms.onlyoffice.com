import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";

import { CardFakeImgForLoading, CardImage, CardStyled, CardTitle } from './card.styled'
import { Skeleton } from '../skeleton'

const Card = (props) => {
    const {onClick, data, isDark} = props;
    const [isLoaded, setIsLoaded] = useState(false)


    const img = data.attributes.card_prewiew?.data?.attributes?.url;
    const name = data.attributes.name_form;

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 300)
    }, [])

    const onLoad = () => {
        setIsLoaded(true)
        console.log('onLoad image: ', name)
    }

    if(!isLoaded) {
        return (
            <>
                <CardFakeImgForLoading
                    src={img}
                    onLoad={onLoad}
                />
                <Skeleton />
            </>
        )
    }



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
