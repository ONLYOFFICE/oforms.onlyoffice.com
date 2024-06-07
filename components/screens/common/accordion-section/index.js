import StyledAccordionSection from "./styled-accordion-section";
import Heading from "@components/common/heading";
import Accordion from "@components/common/accordion";

const AccordionSection = ({ t }) => {
  const items = [
    {
      title: t("Are ONLYOFFICE forms free to use?"),
      content: t("ONLYOFFICE templates are absolutely free to use.")
    },
    {
      title: t("Do I need to register to fill out a form?"),
      content: t("No registration is needed to use the forms: ONLYOFFICE will open the form you choose in the new window, ready to be filled.")
    },
    {
      title: t("Can I download the forms and create documents using them locally?"),
      content: t("Use ONLYOFFICE Docs online or ONLYOFFICE Dekstop Editors to fill forms in the preferred location and create your own. Read more about creating forms in ONLYOFFICE.")
    },
    {
      title: t("Can I modify the forms?"),
      content: t("No, it is not possible to modify the forms. You can only fill in the content in the existing body, or export the form into DOCXF and modify the text file.")
    },
    {
      title: t("What format does ONLYOFFICE use for the forms?"),
      content: t("Ready forms are saved and distributed in PDF.")
    },
    {
      title: t("Do I need additional software to work with ONLYOFFICE forms?"),
      content: t("You can use ONLYOFFICE Docs or free ONLYOFFICE Desktop Editors to work with the forms.")
    },
    {
      title: t("I found a mistake / I want to update a form. Can I suggest revision?"),
      content: t("You can suggest an update/revision for a form on the form page.")
    },
    {
      title: t("I can’t find the template I need in the library. What do I do?"),
      content: t("We happily accept template suggestions to introduce these templates in our form library in the future. Please contact us at marketing@onlyoffice.com to submit your ideas.")
    },
    {
      title: t("Is it possible to embed a form in my website?"),
      content: t("It is technically possible. Please contact us at marketing@onlyoffice.com")
    },
    {
      title: t("I couldn’t find the answer to my questions. Where should I go?"),
      content: t("Please use our community forum to receive support, or send us an inquiry at support@onlyoffice.com.")
    }
  ];

  return (
    <StyledAccordionSection>
      <Heading className="accordion-section-title" level={2} label={t("Frequently Asked Questions")} />
      <Accordion items={items} />
    </StyledAccordionSection>
  );
};

export default AccordionSection;