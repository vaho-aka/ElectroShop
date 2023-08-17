import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const Carousel = () => {
  return (
    <div className="my-4">
      <Swiper navigation={true} modules={[Navigation]}>
        <SwiperSlide>1</SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
        <SwiperSlide>3</SwiperSlide>
        <SwiperSlide>4</SwiperSlide>
        <SwiperSlide>5</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
