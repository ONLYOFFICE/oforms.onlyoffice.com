import React, { useState, useEffect } from "react"

import Card from "../../../../../../components/card";
import Button from "../../../../../../components/button";

import StyledCards from "./styled-cards";

const Cards = ({
    t,
    data,
    typeSortData,
    groupCheckboxIsOpen,
    ...rest
}) => {

    // Array of all items oforms
    const [allItems, setAllItems] = useState(data);
    // Array first 9 elements
    const ItemSliceLength = 9;
    const [allItemsSlice, setAllItemsSlice] = useState(ItemSliceLength);
    const [listCards, setListCards] = useState([...allItems.slice(0, 9)]);

    const handlerSetItemsList = () => {
        const tmpListSlice = [...allItems.slice(0, 9)];
        setListCards(tmpListSlice);
    };

    const handlerSetItemsSlice = () => {
        const tmpLength = data.length > ItemSliceLength ? ItemSliceLength : allItems.length;
        setAllItemsSlice(tmpLength);
    };

    useEffect(() => {
        setAllItems(data);
        handlerSetItemsSlice();
        handlerSetItemsList();
    }, [data, typeSortData, allItemsSlice, allItems]);


    // State of whether there is more to load
    const [hasMore, setHasMore] = useState(allItems.length > allItemsSlice);
    // State to trigger load more
    const [loadMore, setLoadMore] = useState(false);

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
        <div className="tempalates-cards-items" {...rest}>
            <StyledCards groupCheckboxIsOpen={groupCheckboxIsOpen}>
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
                <></>
            )}
        </div>
    );
};

export default Cards;