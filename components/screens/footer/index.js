import { useRouter } from "next/router";
import { OOFooter } from "onlyoffice-react-ui-kit/footer";
import "onlyoffice-react-ui-kit/footer/css";
import languages from "@config/languages.json";

const Footer = ({ locale }) => {
  const router = useRouter();

  return (
    <OOFooter
      locale={locale}
      languages={languages.map((language) => ({
        shortKey: language.shortKey,
        name: language.longKey,
        href: router.asPath
      }))}
      base={{
        url: "https://www.onlyoffice.com",
        withAspx: true,
        localePathMap: {
          ar: "",
        }
      }}
      mailApiUrl={`${process.env.NEXT_PUBLIC_MAIN_SITE_BASE_DOMAIN}/api/sendsubscription`}
      mailApiType="Common"
    />
  );
};

export default Footer;