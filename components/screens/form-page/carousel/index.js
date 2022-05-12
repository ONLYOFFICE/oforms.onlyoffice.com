import Carousel from "@components/common/carousel";
import Box from "@components/common/box";

import StyledCarouselContent from "./carousel-section";
import { cardCarouselSettings } from "./config/carousel-config";
import Heading from "@components/common/heading";

const CarouselContent = ({
  currentLanguage,
  label,
  data,
  config,
  padding,
  tabletPadding,
  mobileLPadding,
  shortCard,
  t,
}) => {
  const customConfig = config || cardCarouselSettings;
  const carousel =
    data.length >= 2 ? (
      <div>
        <Box justifyContent="center">
          <Heading
            as="span"
            fontSize="24px"
            color="#FF6F3D"
            fontWeight="700"
            display="inline"
          >
            {label}
          </Heading>
        </Box>
        <Carousel
          t={t}
          items={data}
          className="card-carousel"
          settingsCarousel={customConfig}
          currentLanguage={currentLanguage}
          shortCard={shortCard}
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
