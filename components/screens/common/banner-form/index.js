import StyledBannerForm from "./styled-banner-form";
import { useRouter } from "next/router";
import ExternalLink from "@components/common/external-link";
import Heading from "@components/common/heading";
import Text from "@components/common/text";

const BannerForm = ({ t }) => {
  const router = useRouter();
  const locale = router.locale;

  return (
    <StyledBannerForm $locale={locale}>
      <div className="banner-form-info">
        <Heading className="banner-form-title" level={2} size={3} label={t("Build your own templates")} />
        <Text as="p" className="banner-form-text" label={t("Create PDF forms, model documents, spreadsheets and presentations for any purpose with ONLYOFFICE Docs.")} />
      </div>
      <div className="banner-form-btns">
        <ExternalLink
          id="banner-form-cloud-link"
          className="btn-primary"
          href={`https://www.onlyoffice.com${(locale === "en" || locale === "ar") ? "" : `/${locale}`}/docspace-registration?utm_source=oforms&utm_medium=top_banner&utm_campaign=registration_docspace&utm_content=use_in_the_cloud`}
          label={t("Use in the cloud")}
        />
        <ExternalLink
          id="banner-form-download-link"
          className="btn-transparent"
          href={`https://www.onlyoffice.com${(locale === "en" || locale === "ar") ? "" : `/${locale}`}/download-desktop#desktop`}
          label={t("Download desktop app")}
        />
      </div>
    </StyledBannerForm>
  );
};

export default BannerForm; 