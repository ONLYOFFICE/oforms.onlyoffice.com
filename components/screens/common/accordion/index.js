import { Trans } from "next-i18next";

import StyledAccordionContent from "./styled-accordion-content";
import { AccordionItem } from "@components/common/accordion";
import Heading from "@components/common/heading";
import Link from "@components/common/link";
import Text from "@components/common/text";

const AccordionContent = ({ t, currentLanguage }) => {
  const lng = currentLanguage === "en" ? "" : `/${currentLanguage}`;

  const ONLYOFFICEDocs = t("ONLYOFFICEDocs");
  const ONLYOFFICEDesktopEditors = t("ONLYOFFICEDesktopEditors");
  const AccordionDescriptionDocsUseLocallyLink = t(
    "AccordionDescriptionDocsUseLocallyLink"
  );

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

  const AccordionDescriptionPossibleToEmbedLink = t(
    "AccordionDescriptionPossibleToEmbedLink"
  );

  const AccordionDescriptionPossibleToEmbed = (
    <Trans
        i18nKey="AccordionDescriptionPossibleToEmbed"
        AccordionDescriptionPossibleToEmbedLink={t(
          "AccordionDescriptionPossibleToEmbedLink"
        )}
      >
        It is technically possible. Please contact us at 
        <Link
          className="link-trans-acc"
          label="marketing@onlyoffice.com"
          href="mailto:marketing@onlyoffice.com"
        >
          {{ AccordionDescriptionPossibleToEmbedLink }}
        </Link>
      </Trans>
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

  const AccordionDescriptionDesktopANDDocs = (
    <Text as={"p"} className="text-trans-accordion">
      <Trans
        i18nKey="AccordionDescriptionAdditionalSoftware"
        ONLYOFFICEDocs={t("ONLYOFFICEDocs")}
        ONLYOFFICEDesktopEditors={t("ONLYOFFICEDesktopEditors")}
      >
        You can use
        <Link
          className="link-trans-acc"
          href={`https://www.onlyoffice.com${lng}/registration.aspx`}
        >
          {{ ONLYOFFICEDocs }}
        </Link>
        <Link
          className="link-trans-acc"
          href={`https://www.onlyoffice.com${lng}/download-desktop.aspx#desktop`}
        >
          {{ ONLYOFFICEDesktopEditors }}
        </Link>
      </Trans>
    </Text>
  );

  return (
    <StyledAccordionContent
      background="#FFFFFF"
      padding="120px 0 112px"
      tabletPadding="80px 0 78px"
      mobileLPadding="48px 0 51px"
    >
      <Heading className="titleAccordion" level={3}>
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
        {AccordionDescriptionDesktopANDDocs}
      </AccordionItem>
      <AccordionItem heading={t("AccordionHeadingSuggestRevision")}>
        {t("AccordionDescriptionSuggestRevision")}
      </AccordionItem>
      <AccordionItem heading={t("AccordionHeadingFindTheTemplate")}>
        {AccordionDescriptionFindTheTemplate}
      </AccordionItem>
      <AccordionItem heading={t("AccordionHeadingPossibleToEmbed")}>
        {AccordionDescriptionPossibleToEmbed}
        
      </AccordionItem>
      <AccordionItem heading={t("AccordionHeadingCouldn’tFindTheAnswer")}>
        {AccordionDescriptionCouldntFindTheAnswer}
      </AccordionItem>
    </StyledAccordionContent>
  );
};

export default AccordionContent;
