import '@/modules/posts/features/CreatePost/views/FillPostInformation/FillPostInformation.scss';

import GeneralCategoryList from '@/components/entities/categories/GeneralCategoryList';

const FillPostInformation = ({ renderSection, generalListData }) => {
  return (
    <div className="fill-post-information">
      <div className="fill-post-information__general-category-list-wrapper">
        <GeneralCategoryList generalListData={generalListData} />
      </div>
      {renderSection}
    </div>
  );
};

export default FillPostInformation;
