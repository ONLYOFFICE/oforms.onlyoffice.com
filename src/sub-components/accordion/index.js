import React from "react";

import { Accordion, AccordionItem } from "../../../components/accordion";

const AccordionContent = ({
    t,
    ...rest
}) => {
    return (
        <Accordion level={4} {...rest}>
            <AccordionItem heading={t("")}>
                
            </AccordionItem>
        </Accordion>
    );
};

export default AccordionContent;