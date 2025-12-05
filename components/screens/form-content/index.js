
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
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/it";
import "moment/locale/es";
import "moment/locale/pt-br";
import "moment/locale/de";
import "moment/locale/ja";
import "moment/locale/zh-cn";
import "moment/locale/ar-sa";

const FormContent = ({ t, locale, form, randomCarousel, recentForms, compilations }) => {
  const { name_form, template_desc, template_image, file_oform, form_exts, url } = form.data[0].attributes;
  const [popupActive, setPopupActive] = useState(false);
  const [isInstalled, setIsInstalled] = useState(true);

  const pdfFile = file_oform?.data?.filter((it) => it?.attributes.name.split(".").pop() === "pdf");
  const docxFile = file_oform?.data?.filter((it) => it?.attributes.name.split(".").pop() === "docx");
  const pptxFile = file_oform?.data?.filter((it) => it?.attributes.name.split(".").pop() === "pptx");
  const xlsxFile = file_oform?.data?.filter((it) => it?.attributes.name.split(".").pop() === "xlsx");
  const linkPdfEditor = `editor?lang=${locale}&filename=${url}&fillform=${`${pdfFile[0]?.attributes?.hash}.pdf`}`;
  const fileSize = pdfFile[0]?.attributes.size || docxFile[0]?.attributes.size || pptxFile[0]?.attributes.size || xlsxFile[0]?.attributes.size;
  const fileUpdatedAt = pdfFile[0]?.attributes.updatedAt || docxFile[0]?.attributes.updatedAt || pptxFile[0]?.attributes.updatedAt || xlsxFile[0]?.attributes.updatedAt;
  const fileUrl = pdfFile[0]?.attributes.url || docxFile[0]?.attributes.url || pptxFile[0]?.attributes.url || xlsxFile[0]?.attributes.url;
  const fileName = pdfFile[0]?.attributes.name || docxFile[0]?.attributes.name || pptxFile[0]?.attributes.name || xlsxFile[0]?.attributes.name;
  console.log (fileUrl)
  console.log(pdfFile[0])

  const handleButtonClick = () => {
    scriptProtocolCheck(
      `oo-office://open|f|n|${fileName}|${fileUrl}`,
      () => setIsInstalled(false),
      () => setIsInstalled(true),
      () => setIsInstalled(false)
    );

    setPopupActive(true);
  };

  return (
    <>
      <StyledMain locale={locale}>
        <Breadcrumbs t={t} label={name_form} locale={locale} />

        <div className="form-preview">
          <div className="form-info">
            <Heading className="form-title" level={1} label={name_form} />
            <div className="form-tags">
              {pdfFile[0]?.attributes?.url &&
                <span className="tag form-tag">{t("Fillable form")}</span>
              }
              <span className="tag template-tag">{t("Editable template")}</span>
            </div>
            <div className="form-row form-row-mobile">
              <div className="form-item last-updated">
                <span className="form-item-label">{t("Last updated")}:</span>
                <span className="form-item-info">
                  {moment(fileUpdatedAt).locale(locale === "pt" ? "pt-br" : locale === "zh" ? "zh-cn" : locale === "ar" ? "ar-sa" : locale).format(locale === "ja" ? "Y年MM月DD日" : locale === "zh" ? "Y年MM月DD" : locale === "ar" ? "D MMMM, YYYY" : "MMMM D, y")}
                </span>
              </div>
              <ExternalLink
                id="suggest-changes-mobile-link"
                className="suggest-changes-link"
                href={`mailto:marketing@onlyoffice.com?subject=${t("SuggestingChangesLink", { name: name_form })}&body=${t("SuggestingChangesLink", { name: name_form })}.`}
                label={t("Suggest changes")}
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
                <span className="form-item-info">
                  {moment(fileUpdatedAt).locale(locale === "pt" ? "pt-br" : locale === "zh" ? "zh-cn" : locale === "ar" ? "ar-sa" : locale).format(locale === "ja" ? "Y年MM月DD日" : locale === "zh" ? "Y年MM月DD日" : locale === "ar" ? "D MMMM, YYYY" : "MMMM D, y")}
                </span>
              </div>
              <ExternalLink
                id="suggest-changes-link"
                className="suggest-changes-link"
                href={`mailto:marketing@onlyoffice.com?subject=${t("SuggestingChangesLink", { name: name_form })}&body=${t("SuggestingChangesLink", { name: name_form })}.`}
                label={t("Suggest changes")}
              />
            </div>
            <div className="form-row form-row-info">
              <div className="form-item">
                <span className="form-item-label">{t("File size")}{locale === "ja" || locale === "zh" ? "：" : locale === "pt" ? ": " : ":"}</span>
                <span className="form-item-info">{fileSize < 1024 ? `${fileSize.toFixed(0)} kb` : `${(fileSize / 1024).toFixed(0)} mb`}</span>
              </div>
            </div>
            <FormDownload t={t} locale={locale} pdfFile={pdfFile} docxFile={docxFile} pptxFile={pptxFile} xlsxFile={xlsxFile} />
            <div className="form-btns">
              {pdfFile[0]?.attributes?.hash &&
                <ExternalLink id="fill-out-pdf-form-link" className="btn-primary" label={t("Fill out PDF form")} href={linkPdfEditor} />
              }
              <Button onClick={handleButtonClick} id="edit-template-btn" className="btn-secondary" label={t("Edit template")} />
            </div>
            <ShareButtons t={t} locale={locale} />
          </div>
        </div>

        <BannerHowCreateForm t={t} locale={locale} form_exts={form_exts} url={url} pdfFile={pdfFile} docxFile={docxFile} pptxFile={pptxFile} xlsxFile={xlsxFile} nameForm={name_form} />
        {!isInstalled &&
          <DesktopNotInstalledPopup t={t} locale={locale} popupActive={popupActive} setPopupActive={setPopupActive} />
        }
      </StyledMain>

      <StyledForms>
        {randomCarousel?.data.length > 0 &&
          <CardSlider t={t} locale={locale} title={t("Other forms")} data={randomCarousel} />
        }
        {recentForms?.length > 1 &&
          <RecentlyViewed t={t} locale={locale} recentForms={recentForms} />
        }
        {compilations?.data.length > 0 &&
          <ExploreOtherTemplate t={t} locale={locale} compilations={compilations} />
        }
      </StyledForms>
    </>
  );
};

export default FormContent;
