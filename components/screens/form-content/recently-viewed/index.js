import StyledRecentlyViewed from "./styled-recenlty-viewed";
import Heading from "@components/common/heading";
import ShortCard from "@components/screens/common/short-card";

const RecentlyViewed = ({ t, recentForms }) => {
  return (
    <StyledRecentlyViewed>
      <Heading className="recently-viewed-title" level={3} dangerouslySetInnerHTML={{ __html: t("Recently viewed") }} />
      <div className="recenlty-viewed-items">
        {recentForms.slice(1).map((data, index) => (
          <ShortCard data={data} key={index} />
        ))}
      </div>
    </StyledRecentlyViewed>
  );
};

export default RecentlyViewed;