import './PriceTitleDescription.scss';

import { currencyFormatter } from '@/utils/common';

const PriceTitleDescription = ({ data }) => {
  const { title, description, price } = data ?? {};
  return (
    <div className="price-title-description">
      {price && <span className="price-title-description__price">{currencyFormatter(price)}</span>}
      {price && <span className="price-title-description__title">{title}</span>}
      {price && <span className="price-title-description__description">{description}</span>}
    </div>
  );
};

export default PriceTitleDescription;
