import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import CarouselItem from './CarouselItem';
import { useAppSelector } from '../hooks';

const Carousel = () => {
  const { products } = useAppSelector((state) => state.products);

  return (
    <div className="my-4">
      <Swiper navigation={true} modules={[Navigation]}>
        {products.slice(0, 3).map((w) => (
          <SwiperSlide key={w._id}>
            <CarouselItem item={w} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
