import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "../style/swiper.css";
import "swiper/css/effect-coverflow";

const ImageSwiper = () => {
  const images = [
    "https://migrated-cricmatch.s3.ap-south-1.amazonaws.com/homepage/banner_one/images/1710502994.webp",
    "https://staging.betmatch.in/build/assets/b2-BrCg-chp.webp",
    "https://staging.betmatch.in/build/assets/b6-lK5ubJqR.webp",
    "https://staging.betmatch.in/build/assets/b7-BLNKvoGv.webp",
    "https://staging.betmatch.in/build/assets/b8-k1f-MTpW.webp",
  ];

  return (
    <div className="flex justify-center items-center h-screen ">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="w-[100%] max-w-[900px] pt-10 pb-10"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="w-[500px] h-[300px]">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full rounded-xl object-cover shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
