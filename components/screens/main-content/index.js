import { StyledHeading, StyledMain } from "./styled-main-content";
import Heading from "@components/common/heading";
import Text from "@components/common/text";
import EditorCard from "./editor-card";
import BannerForm from "@components/screens/common/banner-form";
import CardSlider from "@components/screens/common/card-slider";
import PopularCategories from "./popular-categories";
import CardsBlock from "./cards-block";

const MainContent = ({ t, popularTemplates, categories, pptxForms, docxForms, pdfForms, xlsxForms }) => {
  return (
    <>
      <StyledHeading>
        <div className="info-wrapper">
          <div className="info-top">
            <Heading className="info-title" level={1} dangerouslySetInnerHTML={{ __html: t("Free templates and fillable PDF forms") }} />
            <Text as="p" className="info-text" label={t("Fill out ready PDF forms. Download DOCX, XLSX, PPTX templates, easy editable online in just a few clicks")} />
          </div>
          <Heading className="info-subtitle" level={4} label={t("Templates by Editor")} />
          <div className="info-editors">
            <EditorCard title={t("Fillable form")} linkUrl="/pdf-form-templates" imageUrl="fillable-form.svg" />
            <EditorCard title={t("Document")} linkUrl="/document-templates" imageUrl="document.svg" />
            <EditorCard title={t("Spreadsheet")} linkUrl="/spreadsheet-templates" imageUrl="spreadsheet.svg" />
            <EditorCard title={t("Presentation")} linkUrl="/presentation-templates" imageUrl="presentation.svg" />
          </div>
        </div>
        <BannerForm t={t} />
      </StyledHeading>

      <StyledMain>
        {popularTemplates.data.length > 0 &&
          <CardSlider t={t} title={t("Popular templates")} data={popularTemplates} />
        }
        {categories.data.length > 0 &&
          <PopularCategories t={t} categories={categories} />
        }
        {pdfForms.data.length > 0 &&
          <CardsBlock className="pdf-fillable-form" t={t} title={t("PDF Fillable Forms")} linkUrl={"/pdf-form-templates"} data={pdfForms} />
        }
        {docxForms.data.length > 0 &&
          <CardsBlock t={t} title={t("Document templates")} linkUrl={"/document-templates"} data={docxForms} />
        }
        {xlsxForms.data.length > 0 &&
          <CardsBlock t={t} title={t("Spreadsheet templates")} linkUrl={"/spreadsheet-templates"} data={xlsxForms} />
        }
        {pptxForms.data.length > 0 &&
          <CardsBlock t={t} title={t("Presentation templates")} linkUrl={"/presentation-templates"} data={pptxForms} />
        }
      </StyledMain>
    </>
  );
};

export default MainContent;