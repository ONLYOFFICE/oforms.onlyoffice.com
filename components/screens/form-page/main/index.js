import reName from "@utils/helpers/fixname";

import Box from "@components/common/box";
import Text from "@components/common/text";
import Link from "@components/common/link";
import Button from "@components/common/button";
import Heading from "@components/common/heading";
import { NImage } from "@components/common/image";
import ButtonSelector from "@components/common/button-selector";

import Breadcrumb from "./sub-components/breadcrumb";
import ShareButtonsGroup from "./sub-components/icon-buttons";
import StyledMainInfo from "./styled-main";

const MainInfo = ({ t, currentLanguage, data, link }) => {
  const {
    name_form,
    template_desc,
    template_image,
    file_oform,
    file_last_update,
    file_pages,
    file_size,
    categories,
  } = data;

  const imgUrlCard = template_image.data?.attributes?.url;
  // split file format
  const oformFile = file_oform?.data?.filter((it) => {
    return it?.attributes.name.split(".")[1] === "oform";
  });
  const pdfFile = file_oform?.data?.filter((it) => {
    return it?.attributes.name.split(".")[1] === "pdf";
  });
  const docxfFile = file_oform?.data?.filter((it) => {
    return it?.attributes.name.split(".")[1] === "docxf";
  });

  const file_description = template_desc?.split("\n");

  const transDownloadAs = t("DownloadAs");
  const array = [
    { title: `${transDownloadAs} OFORM`, href: oformFile[0]?.attributes?.url },
    { title: `${transDownloadAs} DOCXF`, href: docxfFile[0]?.attributes?.url },
    { title: `${transDownloadAs} PDF`, href: pdfFile[0]?.attributes?.url },
  ];

  const category = categories.data[0].attributes.categorie;
  const catHref = categories.data[0].attributes.urlReq;

  const SVG_FILE_TYPE = "/icons/oform.svg";
  const baseURL = typeof window !== "undefined" ? window.location.href : null;
  const linkSuggestChanges = `mailto:marketing@onlyoffice.com?subject=Suggesting changes for Form ${name_form}&body=Suggesting changes for Form ${name_form}.`;

  return (
    <StyledMainInfo background="#F9F9F9" tabletPadding="96px 0" mobileLPadding="96px 0">
      <div className="template-main-info">
        <Breadcrumb
          language={currentLanguage}
          categories={category}
          name={name_form}
          href={catHref}
          t={t}
          className="template-breadcrumb"
        />
        <Heading className="main-info-heading" label={name_form} />
        <Text isBold className="main-info-type-item" label={t("Free")} />
        <Box className="main-info-box">
          <div className="main-info-box-tt">
            <Text
              className="main-info-text"
              color="#AAAAAA"
              fontSize="14px"
              fontWeight="bold"
            >
              {t("LastUpdate")}:{" "}
            </Text>
            <Text isBold className="main-info-text">
              {file_last_update}
            </Text>
          </div>
          <Link href={linkSuggestChanges} label={t("SuggestChanges")} />
        </Box>
      </div>
      <div className="template-main-img">
        <NImage
          className="template-image"
          src={imgUrlCard}
          layout="responsive"
          width="544"
          height="768"
        />
      </div>
      <div className="template-main-description">
        <div className="file-description">
          {file_description.map((text, id) => (
            <Text
              className="main-info-description"
              label={text}
              key={`text-description-${id}`}
            />
          ))}
        </div>
        <Box className="file-info">
          <div>
            <Text isBold color="#AAAAAA" className="file-type-text">
              {t("FileType")}:{" "}
            </Text>
            {/*eslint-disable*/}
            <img className="template-image-file-type" src={SVG_FILE_TYPE} />
            {/*eslint-enable*/}
          </div>
          <div>
            <Text isBold color="#AAAAAA">
              {t("FileSize")}:{" "}
            </Text>
            <Text isBold className="file-size-text">
              {file_size}
            </Text>
          </div>
          <div>
            <Text isBold color="#AAAAAA">
              {t("Pages")}:{" "}
            </Text>
            <Text isBold className="file-pages-text">
              {file_pages}
            </Text>
          </div>
        </Box>
        <Box className="file-main-buttons">
          <Link target="_blank" style={{ width: "100%" }} href={link}>
            <Button isScale label={t("OpenAndFill")} />
          </Link>
          <ButtonSelector
            isScale
            array={array}
            defaultVal={t("DownloadAs")}
            className="file-download-button"
          />
        </Box>
        <ShareButtonsGroup name={name_form} baseURL={baseURL} t={t} />
      </div>
    </StyledMainInfo>
  );
};

export default MainInfo;
