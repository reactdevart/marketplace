import '@/modules/posts/features/CreatePost/views/PreviewPostInformation/PreviewPostInformation.scss';

import { memo } from 'react';
import { SwiperSlide } from 'swiper/react';

import Slider from '@/components/shared/Slider';

import DetailedInformation from './components/DetailedInformation';
import PersonlInfo from './components/PersonlInfo';
import PriceTitleDescription from './components/PriceTitleDescription';

const formState = {
  condition: {
    value: {
      name: 'Used (Good)',
      id: 56950,
    },
  },
  subcategory: {
    value: {
      name: 'Furniture',
      id: 1237,
    },
  },
  postTitle: {
    value: 'test elec',
  },
  location: {
    value: 9,
  },
  price: {
    value: '60',
  },
  description: {
    value:
      'Health & Medical Services is a diverse and crucial category within the field of healthcare, encompassing a comprehensive array of services, professionals, and resources aimed at enhancing the overall health and quality of life of individuals and communities. This category plays a vital role in the prevention, diagnosis, treatment, and management of illnesses, injuries, and mental health conditions.',
  },
  pictures: {
    value: [{}],
  },
  phoneNumber: {
    value: '(554) 477-4124',
  },
};

const PreviewPostInformation = () => {
  const priceTitleDescriptionData = {
    title: formState?.postTitle?.value || '',
    description: formState?.description?.value || '',
    price: Number(formState?.price?.value),
  };

  return (
    <div className="preview-post-information">
      <div className="preview">
        <div className="preview__left">
          <div className="preview__slider-wrapper">
            <Slider>
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
            </Slider>
          </div>
          <div className="preview__price-title-description-wrapper">
            <PriceTitleDescription data={priceTitleDescriptionData} />
          </div>
          <div className="preview__detailed-information-wrapper">
            <DetailedInformation />
          </div>
        </div>
        <div className="preview__right">
          <PersonlInfo />
        </div>
      </div>
    </div>
  );
};

export default memo(PreviewPostInformation);
