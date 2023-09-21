import React, { useEffect, useRef, useState } from 'react'
import { CardsStyled, CardsWrapper, ToTopButton } from './cards.styled'
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
    const [skeletonCount, setSkeletonCount] = useState(4)
    const listRef = useRef(null)

    useEffect(() => {
        onResize()
        window.addEventListener('resize', onResize)

        return () => window.removeEventListener('resize', onResize)
    }, [items])

    if (items.length === 0) {
        return <Empty onClear={onClear} />
    }

    const onResize = () => {
        const containerWidth = listRef.current.clientWidth
        const itemWidth = listRef.current.firstChild.clientWidth
        const gap = !Number.isNaN(Number.parseInt(window.getComputedStyle(listRef.current).gap)) ?
            Number.parseInt(window.getComputedStyle(listRef.current).gap) : 0
        const countOfItems = items.length

        const countOfItemsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap))
        const skeletonCount = Math.ceil(countOfItems / countOfItemsPerRow) * countOfItemsPerRow - countOfItems

        setSkeletonCount(skeletonCount !== 0 ? skeletonCount : countOfItemsPerRow)
    }

    console.log(skeletonCount)

    return (
        <CardsWrapper {...otherProps}>
            <CardsStyled ref={listRef} className='cards-list'>
                {
                    items.map(data => <Card key={data.id} data={data} onClick={onCardClick} isDark={isDark} />)
                }
                {
                    isLoading && new Array(skeletonCount).fill(undefined).map((_, index) => <Skeleton key={index}  />)
                }
            </CardsStyled>
            <ToTopButton onClick={topTop} active={toTopButtonActive}>
                <ToTop />
            </ToTopButton>
        </CardsWrapper>
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
