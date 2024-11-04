import '@/components/entities/categories/GeneralCategoryList/GeneralCategoryList.scss';

import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetGeneralCategoriesQuery } from '@/api/categories/categoriesApi';
import CategoryList from '@/components/entities/categories/CategoryList';
import Skeleton from '@/components/shared/Skeleton';
import { setSelectedGeneralCategory } from '@/store/categories/categoriesSlice';

const GeneralCategoryList = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const dispatch = useDispatch();
  const selectedGeneralCategory = useSelector((state) => state.categories.selectedGeneralCategory);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);

  const { data, error, isLoading } = useGetGeneralCategoriesQuery(undefined, {
    selectFromResult: ({ data, ...other }) => {
      return {
        ...other,
        data: {
          data: data?.data.map((item) => ({
            ...item,
            hasChildren: !(item.name.toLowerCase().includes('home') || item.name.toLowerCase().includes('vehicles')),
            name: item.name.split(' ')[0],
          })),
        },
      };
    },
  });

  const handleSelectCategory = (category) => {
    if (expandedCategory?.id === category.id) {
      setExpandedCategory(null);
    } else {
      dispatch(setSelectedGeneralCategory(category));
      setExpandedCategory(category);
    }
  };

  if (isLoading)
    return (
      <div className="general-category-list">
        <span className="general-category-list__title">Select Category</span>
        <div className="general-category-list__list-wrapper">
          <Skeleton count={5} radius="10px" height="70px" />
        </div>
      </div>
    );
  if (error) return <div>Error loading general categories</div>;

  const { data: generalCategories } = data;

  return (
    <div className="general-category-list">
      <span className="general-category-list__title">Select Category</span>
      <div className="general-category-list__list-wrapper">
        {generalCategories?.map((category) => (
          <div
            key={category.id}
            onClick={() => handleSelectCategory(category)}
            className={classNames('general-category-list__list-item', {
              'general-category-list__list-item--active': category.id === selectedGeneralCategory?.id,
            })}
          >
            <span>{category.name}</span>
            {selectedGeneralCategory?.id === category.id &&
              selectedCategory?.general_category_id === category.id &&
              selectedCategory?.name !== 'All' && (
                <span title={selectedCategory?.name} className="general-category-list__selected-category-text">
                  {selectedCategory?.name}
                </span>
              )}
            {expandedCategory?.hasChildren && expandedCategory?.id === category.id && (
              <div className="general-category-list__category-dropdown-wrapper">
                <div className="general-category-list__category-dropdown-inner">
                  <CategoryList />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralCategoryList;
