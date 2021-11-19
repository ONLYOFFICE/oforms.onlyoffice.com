import React from "react";
import { useStaticQuery, graphql } from "gatsby"

import Carousel from "../../../../components/carousel";

import StyledCarouselContent from "./carousel-section";

const CarouselContent = ({

}) => {
    const data = useStaticQuery(graphql`
    {
        allOformsJson {
            totalCount
            nodes {
                categories,
                last_update,
                description,
                id,
                image_src,
                name,
                link_dwn,
                link_redactor
                }
            }
        }
    `);
    const allItems = data.allOformsJson.nodes;
    const tmp = [...allItems.slice(4, 12)];
    return (
        <StyledCarouselContent>
            <Carousel items={tmp} />
        </StyledCarouselContent>
    );
};

export default CarouselContent;