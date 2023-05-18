import Carousel from "@components/common/carousel";
import Box from "@components/common/box";

import StyledCarouselContent from "./carousel-section";
import { cardCarouselSettings } from "./config/carousel-config";
import Heading from "@components/common/heading";
import styled from "styled-components";
import { device } from "@components/utils/devices";


const StyledBox = styled(Box)`
  padding: 0 68px 10px;
  
  @media (max-width: 1200px) {
    padding: 0 46px 10px;
  }
  
  @media (max-width: 577px) {
  padding: 0 8px 10px;
}
`

const CarouselContent = ({
  currentLanguage,
  label,
  data,
  config,
  padding,
  tabletPadding,
  mobileLPadding,
  shortCard,
  description,
  t,
}) => {
  const customConfig = config || cardCarouselSettings;
  const carousel =
    data.length >= 2 ? (
      <div>
        <StyledBox justifyContent="left">
          <Heading
            as="span"
            fontSize="24px"
            color="#FF6F3D"
            fontWeight="700"
            display="inline"
          >
            {label}
          </Heading>
        </StyledBox>
        <Carousel
          t={t}
          items={data}
          className="card-carousel"
          settingsCarousel={customConfig}
          currentLanguage={currentLanguage}
          shortCard={shortCard}
          description={description}
        />
      </div>
    ) : (
      <div />
    );
  return (
    <StyledCarouselContent
      padding={padding}
      tabletPadding={tabletPadding}
      mobileLPadding={mobileLPadding}
      maxWidth="100%"
      maxWidthLaptop="100%"
      shortCard={shortCard}
    >
      {carousel}
    </StyledCarouselContent>
  );
};

export default CarouselContent;
