import StyledPopularCategories from "./styled-popular-categories";
import InternalLink from "@components/common/internal-link";
import Heading from "@components/common/heading";

const PopularCategories = ({ t, locale, categories }) => {
  return (
    <StyledPopularCategories className="popular-categories" $locale={locale}>
      <Heading className="popular-categories-title" level={2} size={3} label={t("Popular categories")} />
      <div className="popular-categories-links">
        {categories?.data?.map((category) => (
          <InternalLink className="popular-categories-link" href={`/form/${category.attributes.urlReq}`} label={category.attributes.categorie} key={category.id} />
        ))}
      </div>
    </StyledPopularCategories>
  );
};

export default PopularCategories;