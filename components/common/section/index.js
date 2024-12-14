import StyledSection from "./styled-section";
import PropTypes from "prop-types";

const Section = ({ className, children }) => {
  return (
    <StyledSection className={className}>
      <div className="section-page">{children}</div>
    </StyledSection>
  );
};

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Section;