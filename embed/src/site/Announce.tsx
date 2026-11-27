import { OOAdventAnnounce } from "onlyoffice-react-ui-kit/advent-announce";
import "onlyoffice-react-ui-kit/advent-announce/css";
import type { Locale } from "../locale";

// Its own chunk: 75 KB gzipped, mostly an HTML parser, so the header does not wait for it.
const SiteAnnounce = ({ locale }: { locale: Locale }) => (
  <OOAdventAnnounce locale={locale} />
);

export { SiteAnnounce };
