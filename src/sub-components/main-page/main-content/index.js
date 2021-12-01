import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby"

import { Categories } from "../../../helpers/categories";

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
    count,
    ...rest
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

    const [checkedItems, setCheckedItems] = useState({});
    const [filterArray, setFilterArray] = useState([]);

    Object.filter = (obj, predicate) =>
        Object.keys(obj)
            .filter(key => predicate(obj[key]))
            .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

    const categoryCheckboxFilter = () => {
        const tmpCheckedItems = Object.filter(checkedItems, checkedItems => checkedItems === true);
        if (Object.getOwnPropertyNames(tmpCheckedItems).length === 0) {
            setFilterArray(allItems);
        }
        else {
            const boolCheckedItems =
                Object.filter(checkedItems, checkedItems => checkedItems === true);

            const objCheckedCategory = Object.keys(boolCheckedItems);
            const tmpItems = allItems.filter((it) => {
                if (objCheckedCategory.includes(it.categories.toLowerCase())) {
                    return {
                        ...it
                    }
                }
            });
            setFilterArray(tmpItems);
        }
    };

    const handleChange = e => {
        setCheckedItems({
            ...checkedItems,
            [e.target.name]: e.target.checked
        });
    };

    useEffect(() => {
        categoryCheckboxFilter();
    }, [checkedItems]);


    return (
        <StyledMainContent background="#F5F5F5">
            <Heading className="heading-cards" textAlign="center" label="Form templates" />
            <Box className="box-doc-info-template">
                <Text isBold>Categories</Text>
                <div className="box-doc-info">
                    <Text> {"Documents:"} {count}</Text>
                    <Selector />
                </div>
            </Box>
            <div className="idk-box-template">
                <div className="checkbox-card-group">
                    {
                        Categories.map((it) =>
                            <Checkbox
                                className="checkbox-card"
                                onChange={handleChange}
                                isChecked={checkedItems[it.name]}
                                key={it.key}
                                label={it.label}
                                name={it.name}
                            />)
                    }
                </div>
                <Box className="box-cards-template" justifyContent="flex-end">
                    <Cards t={t} data={filterArray} />
                </Box>
            </div>
        </StyledMainContent>
    );
};

export default MainContent;
