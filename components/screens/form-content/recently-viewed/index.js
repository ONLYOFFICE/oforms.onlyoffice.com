import StyledRecentlyViewed from "./styled-recenlty-viewed";
import parse from "html-react-parser";
import Heading from "@components/common/heading";
import ShortCard from "@components/screens/common/short-card";

const RecentlyViewed = ({ t, locale, recentForms }) => {
  return (
    <StyledRecentlyViewed $locale={locale}>
      <Heading className="recently-viewed-title" level={2} size={3}>{parse(t("Recently viewed"))}</Heading>
      <div className="recenlty-viewed-items">
        {recentForms.slice(1).map((data, index) => (
          <ShortCard data={data} key={index} />
        ))}
      </div>
    </StyledRecentlyViewed>
  );
};

export default RecentlyViewed;