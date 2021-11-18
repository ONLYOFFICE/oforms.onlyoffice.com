import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";

import { Accordion, AccordionItem } from "../../../components/accordion";

import StyledAccordionContent from "./styled-accordion-content"
import Section from "../section";
import Heading from "../../../components/heading";
import Link from "../../../components/link";

const AccordionContent = ({
    t,
    ...rest
}) => {

    //const ONLYOFFICEDocs = t("ONLYOFFICEDocs");
    //const ONLYOFFICEDesktopEditors = t("ONLYOFFICEDesktopEditors");

    return (
        <StyledAccordionContent>
            <Section
                background="#FFFFFF"
                padding="120px 0 112px"
                tabletPadding="80px 0 78px"
                mobileLPadding="48px 0 51px"
            >
                <Heading className="titleAccordion" level={2}>{t("FAQ")}</Heading>
                <Accordion level={4} {...rest}>
                    <AccordionItem heading={t("AccordionHeadingFreeToUse")}>
                        {t("AccordionDescriptionFreeToUse")}
                    </AccordionItem>
                    <AccordionItem heading={t("AccordionHeadingNeedToRegister")}>
                        {t("AccordionDescriptionNeedToRegister")}
                    </AccordionItem>
                    <AccordionItem heading={t("AccordionHeadingDocsUseLocally")}>
                        {t("AccordionDescriptionDocsUseLocally")}
                    </AccordionItem>
                    <AccordionItem heading={t("AccordionHeadingModifyTheForms")}>
                        {t("AccordionDescriptionModifyTheForms")}
                    </AccordionItem>
                    <AccordionItem heading={t("AccordionHeadingFormatTheForms")}>
                        {t("AccordionDescriptionFormatTheForms")}
                    </AccordionItem>
                    <AccordionItem heading={t("AccordionHeadingExportOtherFormats")}>
                        {t("AccordionDescriptionExportOtherFormats")}
                    </AccordionItem>
                    <AccordionItem heading={t("AccordionHeadingAdditionalSoftware")}>
                        {t("AccordionDescriptionAdditionalSoftware")}
                        {/* <Trans
                            i18nKey="AccordionDescriptionAdditionalSoftware"
                            ONLYOFFICEDocs={t("ONLYOFFICEDocs")}
                            ONLYOFFICEDesktopEditors={t("ONLYOFFICEDesktopEditors")}
                        >
                            You can use {{ONLYOFFICEDocs}} {{ONLYOFFICEDesktopEditors}}
                           <Link href="#" label={ONLYOFFICEDocs} >{{ONLYOFFICEDocs}}</Link>
                            <Link href="#" label={ONLYOFFICEDesktopEditors} >{{ONLYOFFICEDesktopEditors}}</Link> 
                        </Trans> */}
                    </AccordionItem>
                    <AccordionItem heading={t("AccordionHeadingSuggestRevision")}>
                        {t("AccordionDescriptionSuggestRevision")}
                    </AccordionItem>
                    <AccordionItem heading={t("AccordionHeadingFindTheTemplate")}>
                        {t("AccordionDescriptionFindTheTemplate")}
                    </AccordionItem>
                </Accordion>
            </Section>
        </StyledAccordionContent>
    );
};

export default AccordionContent;