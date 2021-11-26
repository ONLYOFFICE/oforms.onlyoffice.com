import React from "react";
import { useStaticQuery, graphql } from "gatsby"

import Carousel from "../../../../components/carousel";
import Heading from "../../../../components/heading";
import StyledCarouselContent from "./carousel-section";
import { cardCarouselSettings } from "./sub-components/carousel-settings";

const CarouselContent = ({
label,
padding
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
        <StyledCarouselContent
        padding="112px 0 40px"
        tabletPadding="80px 0 8px"
        mobileLPadding="48px 0 0"
        maxWidth="100%"
        maxWidthLaptop="100%"
        label={label}
        >
          <Heading as="h3" fontSize="24px" textAlign="center" label={label} />
            <Carousel items={tmp} className="card-carousel" settingsCarousel={cardCarouselSettings}/>
        </StyledCarouselContent>
    );
};

export default CarouselContent;