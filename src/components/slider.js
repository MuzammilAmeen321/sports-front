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
  const shoesData = [
    { id: 1, imgSrc: "https://static.flexdog.com/flexdog-3/products/images/003cf9f1-7e01-4065-a25f-f5035e793011_instyle_ai.jpeg?width=350" },
    { id: 2, imgSrc: "https://www.courir.com/dw/image/v2/BCCL_PRD/on/demandware.static/-/Sites-master-catalog-courir/default/dwe61d1eb4/images/hi-res/001501927_102.png?sw=600&sh=600&sm=fit&q=90" },
    { id: 3, imgSrc: "https://static.flexdog.com/flexdog-4/products/images/ce85b1ad-9061-47f8-8549-e386ecc32684_instyle_ai.jpeg?width=350" },
    { id: 4, imgSrc: "https://image.goat.com/1000/attachments/product_template_pictures/images/019/329/685/original/370750_08.png.png" },
    { id: 5, imgSrc: "https://cdn.modesens.com/media/138125794?w=400" }
];
const ShoeCard = ({ imgSrc }) => (
  <div className="image-card">
      <img src={imgSrc} alt="Puma Shoes" />
      <div className="text">
          <h5>PUMA</h5>
          <h4>Shoes 1</h4>
          <img src="https://www.svgrepo.com/show/510136/plus.svg" alt="Add to cart" />
      </div>
  </div>
);
const ShoeGallery = () => {
  return (
      <div className="main-center-card">
          {shoesData.map(shoe => (
              <ShoeCard key={shoe.id} imgSrc={shoe.imgSrc} />
          ))}
      </div>
  );
};
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
          <ShoeGallery />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
