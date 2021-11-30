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
    const [allItems, setAllItems] = useState(data);
    // Array first 9 elements
    const ItemSliceLength = 9;
    const [allItemsSlice, setAllItemsSlice] = useState(ItemSliceLength);
    const [listCards, setListCards] = useState([...allItems.slice(0, 9)]);

    useEffect(() => {
        setAllItems(data);
        const tmpLength = data.length > ItemSliceLength ? ItemSliceLength : allItems.length;
        const tmpListSlice = [...allItems.slice(0, 9)];
        setAllItemsSlice(tmpLength);
        setListCards(tmpListSlice);

        // console.log("RERENDER CHILD");
        // console.log(allItems);
        // console.log(allItemsSlice);
        // console.log("RERENDER CHILD");

    }, [data, allItemsSlice, allItems]);

    // State of whether there is more to load
    const [hasMore, setHasMore] = useState(allItems.length > allItemsSlice);
    // State to trigger load more
    const [loadMore, setLoadMore] = useState(false);

    
    // console.log("listCards RERENDER CHILD");
    // console.log(listCards);
    // console.log(allItemsSlice);
    // console.log(allItems);
    // console.log(hasMore);

    // console.log("listCards RERENDER CHILD");

    const handleLoadMore = () => {
        setLoadMore(true);
    };

    //Handle loading more cards 
    useEffect(() => {
        if (loadMore && hasMore) {
            const currentLength = listCards.length;
            const isMore = currentLength < allItems.length;
            const nextResults = isMore
                ? allItems.slice(currentLength, currentLength + allItemsSlice)
                : [];
            setListCards([...listCards, ...nextResults]);
            setLoadMore(false);
        };
    }, [loadMore, hasMore, data]);

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