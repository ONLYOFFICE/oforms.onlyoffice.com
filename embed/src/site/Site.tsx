import { OOHeader } from "onlyoffice-react-ui-kit/header";
import { OOFooter } from "onlyoffice-react-ui-kit/footer";
import "onlyoffice-react-ui-kit/header/css";
import "onlyoffice-react-ui-kit/footer/css";
import { LANGUAGES, type Locale } from "../locale";
import styles from "./Site.module.scss";

const SITE_URL = process.env.EMBED_SITE_URL;

// A full reload: the page reads its locale once, from the url.
const languages = LANGUAGES.map(({ shortKey, longKey }) => ({
  key: shortKey,
  shortKey,
  name: longKey,
  href: `?locale=${shortKey}`,
}));

const SiteHeader = ({ locale }: { locale: Locale }) => (
  <div className={styles.header}>
    <OOHeader
      locale={locale}
      languages={languages}
      base={{ url: SITE_URL }}
      phone={{ show: true }}
      backgroundColor="#ffffff"
      borderColor="transparent"
      highlight={{
        buttonId: "oo-menu-item-btn-products",
        linkId: "oo-menu-link-templates",
      }}
    />
  </div>
);

const SiteFooter = ({ locale }: { locale: Locale }) => (
  <div className={styles.footer}>
    <OOFooter
      locale={locale}
      languages={languages}
      base={{ url: SITE_URL }}
      mailApiUrl={`${SITE_URL}/api/sendsubscription`}
      mailApiType="Common"
    />
  </div>
);

export { SiteHeader, SiteFooter };
