import { FooterMenu } from "onlyoffice-react-ui-kit/footer-menu";
import "onlyoffice-react-ui-kit/footer-menu/css";

const Footer = ({ locale }) => {
  return (
    <FooterMenu locale={locale} mailApiUrl="/api/subscribe" mailApiType={0} />
  );
};

export default Footer;