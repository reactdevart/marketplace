/* eslint-disable */

import { Swiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './Slider.scss';

import { Pagination } from 'swiper/modules';

const Slider = ({ children }) => {
  return (
    <Swiper
      className="app-slider"
      modules={[Pagination]}
      pagination={{
        clickable: true,
      }}
    >
      {children}
    </Swiper>
  );
};

export default Slider;
