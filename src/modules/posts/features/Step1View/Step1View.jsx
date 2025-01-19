import './Step1View.scss';

import { memo } from 'react';

import GeneralCategoryList from '@/components/entities/categories/GeneralCategoryList';

import FormRenderer from '../FormRenderer';

const Step1View = ({ onNext }) => {
  return (
    <div className="step-1-view__general-category-list-form-renderer-wrapper">
      <div className="step-1-view__general-category-list-wrapper">
        <GeneralCategoryList />
      </div>
      <div className="step-1-view__form-renderer-wrapper">
        <FormRenderer onNext={onNext} />
      </div>
    </div>
  );
};

export default memo(Step1View);
