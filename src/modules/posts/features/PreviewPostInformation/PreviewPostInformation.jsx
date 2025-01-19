import './PreviewPostInformation.scss';

import { memo, useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';

import Slider from '@/components/shared/Slider';
import { getImages } from '@/utils/imageUtil';

import DetailedInformation from './components/DetailedInformation';
import PersonlInfo from './components/PersonlInfo';
import PriceTitleDescription from './components/PriceTitleDescription';

const PreviewPostInformation = ({ formState }) => {
  const [images, setImages] = useState(null);
  useEffect(() => {
    getImages().then((resImages) => {
      if (resImages.length) {
        setImages(resImages);
      }
    });
  }, []);
  const priceTitleDescriptionData = {
    title: formState?.postTitle?.value || '',
    description: formState?.description?.value || '',
    price: Number(formState?.price?.value),
  };

  return (
    <div className="preview-post-information">
      <div className="preview">
        <div className="preview__left">
          {!!images?.length && (
            <div className="preview__slider-wrapper">
              <Slider>
                {images.map(({ fileName, file, id }) => (
                  <SwiperSlide key={id}>
                    <img src={URL.createObjectURL(file)} alt={fileName} />
                  </SwiperSlide>
                ))}
              </Slider>
            </div>
          )}
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
