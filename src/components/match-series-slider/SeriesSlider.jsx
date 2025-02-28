import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import styled from "styled-components";

// Styled Components
const SlideContainer = styled.div`
  perspective: 1000px;
  width: 100%;
  height: 100%;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 200px; /* Set a fixed height for all images */
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateZ(20px) rotateX(5deg) rotateY(5deg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const SlideShow = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/eb5c5e156332541.63650a3d110b3.png",
      "https://th.bing.com/th/id/OIP.FMIqNaCj8m1jDSSsOwvACAHaFj?w=740&h=555&rs=1&pid=ImgDetMain",
      "https://lh3.googleusercontent.com/k8oxzGo-YtFEjZ6k8EFn5FvXwmslvEnxGxZsj5YmvwaG34F4z0mnDgmzl0cQO7QL5IE=w720-h310",
      "https://th.bing.com/th/id/OIP.m2oaBvkApezhXXUlw7u5uAHaE2?rs=1&pid=ImgDetMain",
      "https://th.bing.com/th/id/OIP.Ye7ZAfwBRfZKEmpulKNb_AHaFj?w=924&h=693&rs=1&pid=ImgDetMain",
    ]);
  }, []);

  const handleSlideClick = (index) => {
    alert(`You clicked on slide ${index + 1}`);
  };

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
                  <SlideContainer onClick={() => handleSlideClick(index)}>
                    <SlideImage
                      src={src}
                      alt={`Slide ${index + 1}`}
                      onError={(e) => (e.target.src = "https://placehold.co/300x200")}
                      loading="lazy"
                    />
                  </SlideContainer>
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