import '@/modules/posts/features/CreatePost/views/FillPostInformation/FillPostInformation.scss';

import CategoriesForm from '@/components/entities/categories/CategoriesForm';
import GeneralCategoryList from '@/components/entities/categories/GeneralCategoryList';

const FillPostInformation = () => {
  return (
    <div className="fill-post-information">
      <div className="fill-post-information__general-category-list-wrapper">
        <GeneralCategoryList />
      </div>
      <div className="fill-post-information__cetagories-form-wrapper">
        <CategoriesForm />
      </div>
    </div>
  );
};

export default FillPostInformation;
