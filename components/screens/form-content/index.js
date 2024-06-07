
import { StyledMain, StyledForms } from "./styled-form-content";
import { useState } from "react";
import { scriptProtocolCheck } from "./check-desktop-installed";
import Heading from "@components/common/heading";
import Text from "@components/common/text";
import ExternalLink from "@components/common/external-link";
import Button from "@components/common/button";
import BannerHowCreateForm from "@components/screens/form-content/banner-how-create-form";
import ShareButtons from "@components/screens/form-content/share-buttons";
import FormDownload from "@components/screens/form-content/form-download";
import Breadcrumbs from "@components/screens/common/breadcrumbs";
import CardSlider from "@components/screens/common/card-slider";
import RecentlyViewed from "@components/screens/form-content/recently-viewed";
import ExploreOtherTemplate from "@components/screens/form-content/explore-other-template";
import DesktopNotInstalledPopup from "./desktop-popup";

const FormContent = ({ t, locale, form, randomCarousel, recentForms, compilations }) => {
  const { name_form, template_desc, template_image, file_oform, url, file_last_update, file_pages, file_size } = form.data[0].attributes;
  const [popupActive, setPopupActive] = useState(false);
  const [isInstalled, setIsInstalled] = useState(true);

  const pdfFile = file_oform?.data?.filter((it) => it?.attributes.name.split(".")[1] === "pdf");
  const docxFile = file_oform?.data?.filter((it) => it?.attributes.name.split(".")[1] === "docx");
  const pptxFile = file_oform?.data?.filter((it) => it?.attributes.name.split(".")[1] === "pptx");
  const xlsxFile = file_oform?.data?.filter((it) => it?.attributes.name.split(".")[1] === "xlsx");
  const linkPdfEditor = `editor?filename=${url}&fillform=${`${pdfFile[0]?.attributes?.hash}.pdf`}`;

  const handleButtonClick = () => {
    scriptProtocolCheck(
      `oo-office://open|f|${pdfFile[0]?.attributes?.url}`,
      () => setIsInstalled(false),
      () => setIsInstalled(true),
      () => setIsInstalled(false)
    );

    setPopupActive(true);
  };

  return (
    <>
      <StyledMain>
        <Breadcrumbs t={t} children={name_form} />

        <div className="form-preview">
          <div className="form-info">
            <Heading className="form-title" level={2} label={name_form} />
            <div className="form-tags">
              {pdfFile[0]?.attributes?.url &&
                <span className="tag form-tag">{t("Fillable form")}</span>
              }
              <span className="tag template-tag">{t("Editable template")}</span>
            </div>
            <div className="form-row form-row-mobile">
              <div className="form-item last-updated">
                <span className="form-item-label">{t("Last updated")}:</span>
                <span className="form-item-info">{file_last_update}</span>
              </div>
              <ExternalLink
                className="suggest-changes-link"
                href={`mailto:marketing@onlyoffice.com?subject=Suggesting changes for Form ${name_form}&body=Suggesting changes for Form ${name_form}.`}
                label={t("Suggest chages")}
              />
            </div>
          </div>

          <div className="form-img">
            <img src={template_image.data?.attributes?.url} alt={name_form} />
          </div>

          <div className="form-description">
            <div className="form-text">
              {template_desc?.split("\n").map((text, id) => (
                <Text as="p" label={text} key={`form-text-${id}`} />
              ))}
            </div>
            <div className="form-row form-row-laptop">
              <div className="form-item last-updated">
                <span className="form-item-label">{t("Last updated")}:</span>
                <span className="form-item-info">{file_last_update}</span>
              </div>
              <ExternalLink
                className="suggest-changes-link"
                href={`mailto:marketing@onlyoffice.com?subject=Suggesting changes for Form ${name_form}&body=Suggesting changes for Form ${name_form}.`}
                label={t("Suggest chages")}
              />
            </div>
            <div className="form-row form-row-info">
              <div className="form-item">
                <span className="form-item-label">{t("File size")}:</span>
                <span className="form-item-info">{file_size}</span>
              </div>
              <div className="form-item">
                <span className="form-item-label">{t("Pages")}:</span>
                <span className="form-item-info">{file_pages}</span>
              </div>
            </div>
            <FormDownload t={t} pdfFile={pdfFile} docxFile={docxFile} pptxFile={pptxFile} xlsxFile={xlsxFile} />
            <div className="form-btns">
              {pdfFile[0]?.attributes?.hash &&
                <ExternalLink className="btn-primary" label={t("Fill out PDF form")} href={linkPdfEditor} />
              }
              <Button onClick={handleButtonClick} className="btn-secondary" label={t("Edit template")} />
            </div>
            <ShareButtons t={t} />
          </div>
        </div>

        <BannerHowCreateForm t={t} linkPdfEditor={linkPdfEditor} nameForm={name_form} />
        {!isInstalled &&
          <DesktopNotInstalledPopup t={t} locale={locale} popupActive={popupActive} setPopupActive={setPopupActive} />
        }
      </StyledMain>

      <StyledForms>
        {randomCarousel?.data.length > 0 &&
          <CardSlider t={t} title={t("Other forms")} data={randomCarousel} />
        }
        {recentForms?.length > 1 &&
          <RecentlyViewed t={t} recentForms={recentForms} />
        }
        {compilations?.data.length > 0 &&
          <ExploreOtherTemplate t={t} locale={locale} compilations={compilations} />
        }
      </StyledForms>
    </>
  );
};

export default FormContent;
