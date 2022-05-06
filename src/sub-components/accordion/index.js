import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";

import { AccordionItem } from "../../../components/accordion";

import StyledAccordionContent from "./styled-accordion-content";
import Section from "../section";
import Heading from "../../../components/heading";
import Link from "../../../components/link";
import Text from "../../../components/text";
import TransAccorionItem from "./item-accordion";

const AccordionContent = ({ t, currentLanguage }) => {
  const ONLYOFFICEDocs = t("ONLYOFFICEDocs");
  const ONLYOFFICEDesktopEditors = t("ONLYOFFICEDesktopEditors");
  const AccordionDescriptionDocsUseLocallyLink = t(
    "AccordionDescriptionDocsUseLocallyLink"
  );
  const lng = currentLanguage === "en" ? "" : `/${currentLanguage}`
  const AccordionDescriptionDocsUseLocally = (
    <Text as={"p"} className="text-trans-accordion">
      <Trans
        i18nKey="AccordionDescriptionDocsUseLocally"
        ONLYOFFICEDocs={t("ONLYOFFICEDocs")}
        ONLYOFFICEDesktopEditors={t("ONLYOFFICEDesktopEditors")}
        AccordionDescriptionDocsUseLocallyLink={t(
          "AccordionDescriptionDocsUseLocallyLink"
        )}
      >
        Use 
        <Link
          display="contents"
          className="link-trans-acc"
          href={`https://www.onlyoffice.com${lng}/office-suite.aspx`}
        >
          {{ ONLYOFFICEDocs }}
        </Link>
        <Link
          display="contents"
          className="link-trans-acc"
          href={`https://www.onlyoffice.com${lng}/desktop.aspx`}
        >
          {{ ONLYOFFICEDesktopEditors }}
        </Link>
        <Link
          display="contents"
          className="link-trans-acc"
          href="https://helpcenter.onlyoffice.com/ONLYOFFICE-Editors/ONLYOFFICE-Document-Editor/UsageInstructions/CreateFillableForms.aspx"
        >
          {{ AccordionDescriptionDocsUseLocallyLink }}
        </Link>
      </Trans>
    </Text>
  );

  const AccordionDescriptionFormatTheFormsLink = t(
    "AccordionDescriptionFormatTheFormsLink"
  );
  const AccordionDescriptionFormatTheForms = (
    <Text as={"p"} className="text-trans-accordion">
      <Trans
        i18nKey="AccordionDescriptionFormatTheForms"
        AccordionDescriptionFormatTheFormsLink={t(
          "AccordionDescriptionFormatTheFormsLink"
        )}
      >
        All forms are stored in .OFORM format
        <Link
          display="contents"
          className="link-trans-acc"
          href="https://www.onlyoffice.com/whitepapers.aspx"
        >
          {{ AccordionDescriptionFormatTheFormsLink }}
        </Link>
      </Trans>
    </Text>
  );

  const AccordionDescriptionFindTheTemplateLink = t(
    "AccordionDescriptionFindTheTemplateLink"
  );
  const AccordionDescriptionFindTheTemplate = (
    <Text as={"p"} className="text-trans-accordion">
      <Trans
        i18nKey="AccordionDescriptionFindTheTemplate"
        AccordionDescriptionFindTheTemplateLink={t(
          "AccordionDescriptionFindTheTemplateLink"
        )}
      >
        We happily accept template suggestions to introduce
        <Link
          display="contents"
          className="link-trans-acc"
          href="mailto:marketing@onlyoffice.com"
        >
          {{ AccordionDescriptionFindTheTemplateLink }}
        </Link>
      </Trans>
    </Text>
  );

  const AccordionDescriptionCouldntFindTheAnswerSupp = t(
    "AccordionDescriptionCouldntFindTheAnswerSupp"
  );
  const AccordionDescriptionCouldntFindTheAnswerCommunity = t(
    "AccordionDescriptionCouldntFindTheAnswerCommunity"
  );
  const AccordionDescriptionCouldntFindTheAnswer = (
    <Text as={"p"} className="text-trans-accordion">
      <Trans
        i18nKey="AccordionDescriptionCouldn’tFindTheAnswer"
        AccordionDescriptionCouldntFindTheAnswerSupp={t(
          "AccordionDescriptionCouldntFindTheAnswerSupp"
        )}
        AccordionDescriptionCouldntFindTheAnswerCommunity={t(
          "AccordionDescriptionCouldntFindTheAnswerCommunity"
        )}
      >
        Please use our
        <Link
          display="contents"
          className="link-trans-acc"
          href="https://forum.onlyoffice.com/"
        >
          {{ AccordionDescriptionCouldntFindTheAnswerCommunity }}
        </Link>
        <Link
          display="contents"
          className="link-trans-acc"
          href="mailto:support@onlyoffice.com"
        >
          {{ AccordionDescriptionCouldntFindTheAnswerSupp }}
        </Link>
      </Trans>
    </Text>
  );

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
          {AccordionDescriptionDocsUseLocally}
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingModifyTheForms")}>
          {t("AccordionDescriptionModifyTheForms")}
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingFormatTheForms")}>
          {AccordionDescriptionFormatTheForms}
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingExportOtherFormats")}>
          {t("AccordionDescriptionExportOtherFormats")}
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingAdditionalSoftware")}>
          <TransAccorionItem currentLanguage={currentLanguage} t={t} />
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingSuggestRevision")}>
          {t("AccordionDescriptionSuggestRevision")}
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingFindTheTemplate")}>
          {AccordionDescriptionFindTheTemplate}
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingPossibleToEmbed")}>
          {t("AccordionDescriptionPossibleToEmbed")}
          <Link
            className="link-trans-acc"
            label="marketing@onlyoffice.com"
            href="mailto:marketing@onlyoffice.com"
          />
        </AccordionItem>
        <AccordionItem heading={t("AccordionHeadingCouldn’tFindTheAnswer")}>
          {AccordionDescriptionCouldntFindTheAnswer}
        </AccordionItem>
      </Section>
    </StyledAccordionContent>
  );
};

export default AccordionContent;
