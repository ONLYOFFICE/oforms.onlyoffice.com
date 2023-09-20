import React, { useRef, useState } from 'react'
import { CardsStyled, ToTopButton } from './cards.styled'
import PropTypes from 'prop-types'
import Card from '../card'
import Empty from '../empty'
import { ToTop } from '@icons'
import { Skeleton } from '../skeleton'

const Cards = (props) => {
    const {
        items,
        onCardClick,
        onClear,
        isDark,
        topTop,
        toTopButtonActive,
        isLoading,
        ...otherProps
    } = props

    if (items.length === 0) {
        return <Empty onClear={onClear} />
    }
    return (
        <CardsStyled {...otherProps}>
            {
                items.map(data => <Card key={data.id} data={data} onClick={onCardClick} isDark={isDark} />)
            }
            {
                true && (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                )
            }
            <ToTopButton onClick={topTop} active={toTopButtonActive}>
                <ToTop />
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
    isLoading: PropTypes.bool.isRequired,
}
export default Cards
