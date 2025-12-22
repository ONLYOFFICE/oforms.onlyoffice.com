import StyledBannerHowCreateForm from "./styled-banner-how-create-form";
import parse from "html-react-parser";
import Heading from "@components/common/heading";
import ExternalLink from "@components/common/external-link";

const BannerHowCreateForm = ({ t, locale, form_exts, url, pdfFile, docxFile, pptxFile, xlsxFile, nameForm }) => {
  const link = form_exts?.data.some(ext => ext.attributes.ext === "docx") ? `editor?lang=${locale}&filename=${url}&fillform=${`${docxFile[0]?.attributes?.hash}.docx`}` :
    form_exts?.data.some(ext => ext.attributes.ext === "xlsx") ? `editor?lang=${locale}&filename=${url}&fillform=${`${xlsxFile[0]?.attributes?.hash}.xlsx`}` :
    form_exts?.data.some(ext => ext.attributes.ext === "pptx") ? `editor?lang=${locale}&filename=${url}&fillform=${`${pptxFile[0]?.attributes?.hash}.pptx`}` : 
    `editor?lang=${locale}&filename=${url}&fillform=${`${pdfFile[0]?.attributes?.hash}.pdf`}`;

  return (
    <StyledBannerHowCreateForm $locale={locale} className="banner-how-create-form">
      <div className="banner-body">
        <Heading className="banner-title" level={2}>
          {parse(t("HowToCreateATemplate", { nameForm }))}
        </Heading>
        <ol className="banner-list">
          <li>{parse(t("Click Fill Out to launch the corresponding editor online"))}</li>
          <li><b>{t("Enter the necessary information and edit the template as you need")}</b></li>
          <li>{t("Download the ready document from the editor")}</li>
        </ol>
      </div>
      <ExternalLink id="how-create-form-btn" className="banner-btn" href={link} label={t("Fill out")} />
    </StyledBannerHowCreateForm>
  );
};

export default BannerHowCreateForm;