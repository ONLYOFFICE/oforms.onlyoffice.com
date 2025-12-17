import StyledSearchTopSection from "./styled-search-top-section";
import SearchInput from "../search-input";
import InternalLink from "@components/common/internal-link";
import Text from "@components/common/text";

const SearchTopSection = ({ t, locale }) => {
  return (
    <StyledSearchTopSection className="" $locale={locale}>
      <InternalLink className="back-btn" href="/">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.4564 12.0026L14.7064 7.74272C15.0965 7.35182 15.0981 6.71632 14.71 6.32332L14.6829 6.29592C14.2949 5.90292 13.6641 5.90132 13.274 6.29232L8.2942 11.2836C8.0742 11.5041 7.9777 11.8024 8.0051 12.0911C8.0232 12.3217 8.1201 12.547 8.2956 12.7229L13.269 17.7078C13.6591 18.0988 14.2899 18.0972 14.6779 17.7042L14.705 17.6768C15.093 17.2838 15.0914 16.6483 14.7013 16.2574L10.4564 12.0026Z" fill="#444444" />
        </svg>
        <Text className="back-btn-link" label={t("Home Templates")} />
      </InternalLink>
      <SearchInput t={t} locale={locale} />
    </StyledSearchTopSection>
  );
};

export default SearchTopSection;
