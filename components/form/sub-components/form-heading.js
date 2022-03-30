import React from "react";
import Heading from "../../heading";

const FormHeading = (props) => {
  const { item, isPanel } = props;

  const { headingText, isHeader, ...itemProps } = item;

  const fontSize = isPanel || !isHeader ? "18px" : "32px";
  const headingLevel = isHeader ? 2 : 4;
  let cssClass = "form-heading";

  if (isHeader) cssClass = cssClass + " form-header";

  return (
    <Heading
      {...itemProps}
      className={cssClass}
      level={headingLevel}
      fontSize={fontSize}
      isPanel={isPanel}
    >
      {headingText}
    </Heading>
  );
};

export default FormHeading;
