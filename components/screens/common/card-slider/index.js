import StyledCardSlider from "./styled-card-slider";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Heading from "@components/common/heading";
import Card from "@components/screens/common/card";
import "swiper/css";

const CardSlider = ({ t, locale, title, data }) => {
  const [isSliderEnabled, setIsSliderEnabled] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1024) {
        setIsSliderEnabled(false);
      } else {
        setIsSliderEnabled(true);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledCardSlider className="card-slider" locale={locale}>
      {title &&
        <Heading className="card-slider-title" level={3} dangerouslySetInnerHTML={{__html: title}} />
      }

      <div className="card-slider-list">
        {isSliderEnabled ? (
          <>
            <Swiper
              spaceBetween={32}
              slidesPerView={3}
              modules={[Navigation]}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
            >
              {data.data.map((data, index) => (
                <SwiperSlide key={index}>
                  <Card t={t} data={data} />
                </SwiperSlide>
              ))}
            </Swiper>
            {data.data.length > 3 &&
              <div className="card-slider-navigation">
                <button className="swiper-button-prev">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.4564 11.9975L14.7064 16.2574C15.0964 16.6483 15.0981 17.2838 14.71 17.6768L14.683 17.7042C14.2949 18.0972 13.6641 18.0988 13.274 17.7078L8.29417 12.7165C8.07416 12.496 7.97772 12.1977 8.00508 11.909C8.02321 11.6784 8.12008 11.4531 8.29557 11.2772L13.269 6.2923C13.6591 5.90132 14.2899 5.90294 14.6779 6.29591L14.705 6.32332C15.093 6.71629 15.0914 7.3518 14.7013 7.74277L10.4564 11.9975Z" fill="#444444"/>
                  </svg>
                </button>
                <button className="swiper-button-next">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.5436 11.9975L9.29363 16.2574C8.90355 16.6483 8.90192 17.2838 9.28998 17.6768L9.31705 17.7042C9.70511 18.0972 10.3359 18.0988 10.726 17.7078L15.7058 12.7165C15.9258 12.496 16.0223 12.1977 15.9949 11.909C15.9768 11.6784 15.8799 11.4531 15.7044 11.2772L10.731 6.2923C10.3409 5.90132 9.71014 5.90294 9.32208 6.29591L9.29502 6.32332C8.90696 6.71629 8.90859 7.3518 9.29866 7.74277L13.5436 11.9975Z" fill="#444444"/>
                  </svg>
                </button>
              </div>
            }
          </>
        ) : (
          data.data.map((data, index) => (
            <Card key={index} t={t} data={data} />
          ))
        )}
      </div>
    </StyledCardSlider>
  );
};

export default CardSlider;