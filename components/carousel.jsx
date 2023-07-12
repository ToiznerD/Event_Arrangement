import React from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Carousel = ({images}) => {


  return (
    <div className="w-full md:w-[700px] flex justify-center">
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        spaceBetween={50}
        navigation
        centeredSlides={true}
              centeredSlidesBounds={true}
      >
        <SwiperSlide >
          <img src={images[0]} className="mx-auto md:ml-[50px] md:w-[600px] md:h-[500px] w-[300px] h-[250px]"  alt="Image 1" />
        </SwiperSlide>
        <SwiperSlide>
        <img src={images[1]} className="mx-auto md:ml-[50px] md:w-[600px] md:h-[500px] w-[300px] h-[250px]" alt="Image 1" />
        </SwiperSlide>
        <SwiperSlide>
        <img src={images[2]} className="mx-auto md:ml-[50px] md:w-[600px] md:h-[500px] w-[300px] h-[250px]" alt="Image 1" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
