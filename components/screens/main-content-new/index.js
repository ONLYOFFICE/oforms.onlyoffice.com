import { useMemo, useState } from "react";
import { StyledWrapper, StyledHeading, StyledMain, StyledContainer } from "./styled-main-content";
import FilterSidebar from "./components/filter-sidebar";
import TemplatesList from "./components/templates-list";
import { DEFAULT_PURPOSE } from "./data/filter-data";
import { buildTemplatesData, normalizeOforms } from "./data/templates-data";

const MainContent = ({ oforms }) => {
  const [activeType, setActiveType] = useState([]);
  const [activeCountry, setActiveCountry] = useState([]);
  const [activePurpose, setActivePurpose] = useState(DEFAULT_PURPOSE);
  const [activeCategory, setActiveCategory] = useState([]);

  const data = useMemo(() => {
    const forms = normalizeOforms(oforms);
    return buildTemplatesData(forms);
  }, [oforms]);

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledHeading>
          <h1 className="main-title">
            Free document templates and fillable forms
          </h1>
          <p className="main-subtitle">
            Download ready-made templates or fill out PDF forms online.
          </p>
        </StyledHeading>

        <StyledMain>
          <FilterSidebar
            activeType={activeType}
            setActiveType={setActiveType}
            activeCountry={activeCountry}
            setActiveCountry={setActiveCountry}
            activePurpose={activePurpose}
            setActivePurpose={setActivePurpose}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            countsByPurpose={data.COUNTS_BY_PURPOSE}
            purposeCounts={data.PURPOSE_COUNTS}
          />
          <TemplatesList
            activeType={activeType}
            activeCountry={activeCountry}
            activePurpose={activePurpose}
            activeCategory={activeCategory}
            sectionsByPurpose={data.TEMPLATE_SECTIONS_BY_PURPOSE}
            defaultSections={data.DEFAULT_SECTIONS}
            popularTemplates={data.POPULAR_TEMPLATES}
          />
        </StyledMain>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default MainContent;
