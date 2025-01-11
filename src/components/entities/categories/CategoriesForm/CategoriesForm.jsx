import '@/components/entities/categories/CategoriesForm/CategoriesForm.scss';

import CategoryFormRenderer from '@/components/entities/categories/CategoryFormRenderer';

const CategoriesForm = ({ renderSection, handleFormSubmit }) => {
  return (
    <div className="categories-form">
      <CategoryFormRenderer renderSection={renderSection} handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default CategoriesForm;
