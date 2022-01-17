import React from "react";

import { AccordionItem } from "../../../components/accordion";

import StyledAccordionContent from "./styled-accordion-content";
import Section from "../section";
import Heading from "../../../components/heading";
import Link from "../../../components/link";
import TransAccorionItem from "./item-accordion";

const AccordionContent = ({ t }) => {
  return (
    <StyledAccordionContent>
      <Section
        background="#FFFFFF"
        padding="120px 0 112px"
        tabletPadding="80px 0 78px"
        mobileLPadding="48px 0 51px"
      >
        <Heading className="titleAccordion" level={2}>
          {t("FAQ")}
        </Heading>
        <AccordionItem heading={t("AccordionHeadingFreeToUse")}>
          {t("AccordionDescriptionFreeToUse")}
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingNeedToRegister")}>
          {t("AccordionDescriptionNeedToRegister")}
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingDocsUseLocally")}>
          {/* {t("AccordionDescriptionDocsUseLocally")} */}
          Use ONLYOFFICE Docs online or ONLYOFFICE Dekstop Editors to fill forms
          in the preferred location and create your own.{" "}
          <Link
            className="link-trans-acc"
            href="https://helpcenter.onlyoffice.com/ONLYOFFICE-Editors/ONLYOFFICE-Document-Editor/UsageInstructions/CreateFillableForms.aspx"
          >
            Read more about creating forms in ONLYOFFICE
          </Link>
          .
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingModifyTheForms")}>
          {t("AccordionDescriptionModifyTheForms")}
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingFormatTheForms")}>
          {/* {t("AccordionDescriptionFormatTheForms")} */}
          All forms are stored in .OFORM format.{" "}
          <Link
            className="link-trans-acc"
            href="https://www.onlyoffice.com/whitepapers.aspx"
          >
            Read the format specification
          </Link>
          .
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingExportOtherFormats")}>
          {t("AccordionDescriptionExportOtherFormats")}
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingAdditionalSoftware")}>
          <TransAccorionItem t={t} />
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingSuggestRevision")}>
          {t("AccordionDescriptionSuggestRevision")}
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingFindTheTemplate")}>
          {/* {t("AccordionDescriptionFindTheTemplate")} */}
          We happily accept template suggestions to introduce these templates in
          our form library in the future. Please contact us at{" "}
          <Link
            className="link-trans-acc"
            label="marketing@onlyoffice.com"
            href="mailto:marketing@onlyoffice.com"
          />{" "}
          to submit your ideas.
        </AccordionItem>
        <AccordionItem
          heading={t("Is it possible to embed a form in my website?")}
        >
          {t("It is technically possible. Please contact us at ")}
          <Link
            className="link-trans-acc"
            label="marketing@onlyoffice.com"
            href="mailto:marketing@onlyoffice.com"
          />
          .
        </AccordionItem>
        <AccordionItem
          heading={t(
            "I couldn’t find the answer to my questions. Where should I go?"
          )}
        >
          {/* {t("Please use our community forum to receive support, or send us an inquiry at ")} */}
          Please use our{" "}
          <Link className="link-trans-acc" href="https://forum.onlyoffice.com/">
            community forum
          </Link>{" "}
          to receive support, or send us an inquiry at &nbsp;
          <Link
            className="link-trans-acc"
            label="support@onlyoffice.com"
            href="mailto:support@onlyoffice.com"
          />
          .
        </AccordionItem>
      </Section>
    </StyledAccordionContent>
  );
};

export default AccordionContent;
