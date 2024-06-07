import StyledCardSlider from "./styled-card-slider";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Heading from "@components/common/heading";
import Card from "@components/screens/common/card";
import "swiper/css";

const CardSlider = ({ t, title, data }) => {
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
    <StyledCardSlider className="card-slider">
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
                  <ReactSVG src="/icons/arrow-left.svg" />
                </button>
                <button className="swiper-button-next">
                  <ReactSVG src="/icons/arrow-right.svg" />
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