import { OOAdventAnnounce } from "onlyoffice-react-ui-kit/advent-announce";
import "onlyoffice-react-ui-kit/advent-announce/css";

const AdventAnnounce = ({ locale }) => {
  return (
    <OOAdventAnnounce locale={locale} />
  )
}

export default AdventAnnounce;