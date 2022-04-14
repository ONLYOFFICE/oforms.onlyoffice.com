import React from "react";
import StyledSection from "./styled-section";

const Section = (props) => {
  return (
    <StyledSection {...props}>
      <div className="section-page">{props.children}</div>
    </StyledSection>
  );
};

export default Section;
