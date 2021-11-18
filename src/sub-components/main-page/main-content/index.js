import React from "react";
import { useStaticQuery, graphql } from "gatsby"

import Heading from "../../../../components/heading";
import Text from "../../../../components/text";
import Selector from "../../../../components/selector";
import Box from "../../../../components/box";
import Checkbox from "../../../../components/checkbox";

import Cards from "./sub-components/cards";

import StyledMainContent from "./styled-main-content";

const MainContent = ({
    t,
    language,
    ...rest
}) => {

    const check = [
        "Agreements",
        "Mortgage",
        "Busines Plans",
        "Car",
        "Constructions",
        "Education",
        "Employment",
        "Family",
        "Financial",
        "Customer success",
        "Forms",
        "Tax From templates",
        "Healthcare",
        "Invocies",
        "Legal",
        "Manufacturing",
        "Marketing",
        "Proposals",
        "Real estate",
        "Sales",
        "Contracts",
        "Technology",
        "Software",
        "Consluting",
    ]

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

    const Count = data.allOformsJson.totalCount;
    // Array of all items oforms
    const allItems = data.allOformsJson.nodes;
    //TO DO
    return (
        <StyledMainContent background="#F5F5F5">
            <Heading className="heading-cards" textAlign="center" label="Form templates" />
            <Box className="box-doc-info-template">
                <Text isBold>Categories</Text>
                <div className="box-doc-info">
                    <Text> {"Documents:"} {Count}</Text>
                    <Selector />
                </div>
            </Box>
            <div className="idk-box-template">
                <div className="checkbox-card-group">
                    {
                        check.map((it, id) => <Checkbox className="checkbox-card" key={id} label={it} />)
                    }
                </div>
                <Box className="box-cards-template" justifyContent="flex-end">
                    <Cards t={t} data={allItems} />
                </Box>
            </div>

        </StyledMainContent>
    );
};

export default MainContent;
