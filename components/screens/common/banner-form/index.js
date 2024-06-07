import StyledBannerForm from "./styled-banner-form";
import { useRouter } from "next/router";
import ExternalLink from "@components/common/external-link";
import Heading from "@components/common/heading";
import Text from "@components/common/text";
import InternalLink from "@components/common/internal-link";

const BannerForm = ({ t }) => {
  const router = useRouter();
  const locale = router.locale;

  return (
    <StyledBannerForm>
      <div className="banner-form-info">
        <Heading className="banner-form-title" level={3} label={t("Build your own forms")} />
        <Text as="p" className="banner-form-text">
          {t("Create model documents, agreements, and contracts for any purpose with ONLYOFFICE Docs.")} <InternalLink label={t("Suggest form")} href="/form-submit" />
        </Text>
      </div>
      <div className="banner-form-btns">
        <ExternalLink
          className="btn-primary"
          href={`https://www.onlyoffice.com${locale === "en" ? "" : `/${locale}`}/docspace-registration.aspx?utm_source=oforms&utm_medium=top_banner&utm_campaign=registration_docspace&utm_content=use_in_the_cloud`}
          label={t("Use in the cloud")}
        />
        <ExternalLink
          className="btn-transparent"
          href={`https://www.onlyoffice.com${locale === "en" ? "" : `/${locale}`}/download-desktop.aspx#desktop`}
          label={t("Download desktop app")}
        />
      </div>
    </StyledBannerForm>
  );
};

export default BannerForm;