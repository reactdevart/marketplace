import '@/modules/posts/features/CreatePost/views/FillPostInformation/FillPostInformation.scss';

import CategoriesForm from '@/components/entities/categories/CategoriesForm';
import GeneralCategoryList from '@/components/entities/categories/GeneralCategoryList';

const FillPostInformation = ({ renderSection, handleFormSubmit, generalListData }) => {
  return (
    <div className="fill-post-information">
      <div className="fill-post-information__general-category-list-wrapper">
        <GeneralCategoryList generalListData={generalListData} />
      </div>
      <div className="fill-post-information__cetagories-form-wrapper">
        <CategoriesForm renderSection={renderSection} handleFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default FillPostInformation;
