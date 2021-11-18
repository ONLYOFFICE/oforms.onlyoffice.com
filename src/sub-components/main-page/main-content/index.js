import React from "react";
import { useStaticQuery, graphql } from "gatsby"

import Heading from "../../../../components/heading";
import Box from "../../../../components/box";
import Cards from "./sub-components/cards";

import StyledMainContent from "./styled-main-content";

const MainContent = ({
    t,
    language,
    ...rest
}) => {

    const data = useStaticQuery(graphql`
    {
        allOformsJson {
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
    // Array of all items oforms
    const allItems = data.allOformsJson.nodes;

    return (
        <StyledMainContent background="#F5F5F5">
            <Heading className="heading-cards" textAlign="center" label="Form templates" />
                
                <Box className="box-cards-template" justifyContent="flex-end">
                    <Cards t={t} data={allItems} />
                </Box>
          
        </StyledMainContent>
    );
};

export default MainContent;
