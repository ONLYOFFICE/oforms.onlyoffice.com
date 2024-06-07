import StyledBannerFormSection from "./styled-banner-form-section";
import BannerForm from "@components/screens/common/banner-form";

const BannerFormSection = ({ t }) => {
  return (
    <StyledBannerFormSection>
      <BannerForm t={t} />
    </StyledBannerFormSection>
  );
};

export default BannerFormSection;