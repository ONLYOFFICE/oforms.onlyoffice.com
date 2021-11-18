import React, { useState, useEffect } from "react"

import Card from "../../../../../../components/card";
import Button from "../../../../../../components/button";

import StyledCards from "./styled-cards";

const Cards = ({
    t,
    data,
    ...rest
}) => {

    // Array of all items oforms
    const allItems = data;
    // console.log(allItems);
    // Array first 9 elements
    const [listCards, setListCards] = useState([...allItems.slice(0, 9)]);
    // State of whether there is more to load
    const [hasMore, setHasMore] = useState(allItems.length > 9);
    // State to trigger load more
    const [loadMore, setLoadMore] = useState(false);


    const handleLoadMore = () => {
        setLoadMore(true);
    };

    // Handle loading more cards 
    useEffect(() => {
        if (loadMore && hasMore) {
            const currentLength = listCards.length;
            const isMore = currentLength < allItems.length;
            const nextResults = isMore
                ? allItems.slice(currentLength, currentLength + 9)
                : [];
            setListCards([...listCards, ...nextResults]);
            setLoadMore(false);
        };
    }, [loadMore, hasMore]);

    // Check if there is more
    useEffect(() => {
        const isMore = listCards.length < allItems.length;
        setHasMore(isMore);
    }, [listCards]);

    return (
        <div className="tempalates-cards-items">
            <StyledCards>
                {
                    listCards.map((it, id) =>
                    <Card key={id} arrayItems={it} />)
                }
            </StyledCards>
            {hasMore ? (
                <Button
                    isScale
                    className="tempalates-buttons-items"
                    typeButton="transparent"
                    onClick={handleLoadMore}
                    label="Load More"
                />
            ) : (
                <p>No more results</p>
            )}
        </div>
    );
};

export default Cards;