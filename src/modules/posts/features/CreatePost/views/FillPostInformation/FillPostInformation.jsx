import '@/modules/posts/features/CreatePost/views/FillPostInformation/FillPostInformation.scss';

import { useSelector } from 'react-redux';

import CategoryFormRenderer from '@/components/entities/categories/CategoryFormRenderer';
import GeneralCategoryList from '@/components/entities/categories/GeneralCategoryList';

const FillPostInformation = ({ renderSection, handleFormSubmit, generalListData }) => {
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  return (
    <div className="fill-post-information">
      <div className="fill-post-information__general-category-list-wrapper">
        <GeneralCategoryList generalListData={generalListData} />
      </div>
      {selectedCategory && (
        <div className="fill-post-information__caregory-form-renderer-wrapper">
          <CategoryFormRenderer renderSection={renderSection} handleFormSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};

export default FillPostInformation;
