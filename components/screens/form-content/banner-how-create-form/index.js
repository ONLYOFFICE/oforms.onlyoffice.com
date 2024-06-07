import StyledBannerHowCreateForm from "./styled-banner-how-create-form";
import Heading from "@components/common/heading";
import ExternalLink from "@components/common/external-link";

const BannerHowCreateForm = ({ t, linkPdfEditor, nameForm }) => {
  return (
    <StyledBannerHowCreateForm className="banner-how-create-form">
      <div className="banner-body">
        <Heading className="banner-title" level={3}>
          <span dangerouslySetInnerHTML={{__html: t("HowToCreateATemplate", { nameForm })}} />
        </Heading>
        <ol className="banner-list">
          <li>{t("Click Fill Out to launch the form editor online")}</li>
          <li>{t("Fill in the necessary information in the empty fields")}</li>
          <li>{t("Download the ready document from the editor")}</li>
        </ol>
      </div>
      <ExternalLink className="banner-btn" href={linkPdfEditor} label={t("Fill out")} />
    </StyledBannerHowCreateForm>
  );
};

export default BannerHowCreateForm;