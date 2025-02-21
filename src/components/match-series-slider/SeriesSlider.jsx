import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const SlideShow = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([
      "https://source.unsplash.com/300x200/?cricket",
      "https://source.unsplash.com/300x200/?football",
      "https://source.unsplash.com/300x200/?basketball",
      "https://source.unsplash.com/300x200/?tennis",
      "https://source.unsplash.com/300x200/?sports",
    ]);
  }, []);

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {images.length > 0 && (
            <Swiper
              slidesPerView={3}
              spaceBetween={15}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                320: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
              }}
            >
              {images.map((src, index) => (
                <SwiperSlide key={index} className="text-center">
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="img-fluid rounded shadow-sm slide-img"
                    onError={(e) => (e.target.src = "https://placehold.co/300x200")}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
