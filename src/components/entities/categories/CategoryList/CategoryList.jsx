import '@/components/entities/categories/CategoryList/CategoryList.scss';

import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '@/components/shared/Spinner';
import { useGetCategoriesForGeneralCategoryIdQuery } from '@/store/categories/categoriesApi';
import { setSelectedCategory } from '@/store/categories/categoriesSlice';

const CategoryList = () => {
  const dispatch = useDispatch();
  const selectedGeneralCategory = useSelector((state) => state.categories.selectedGeneralCategory);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const { data, error, isLoading } = useGetCategoriesForGeneralCategoryIdQuery(selectedGeneralCategory?.id, {
    skip: !selectedGeneralCategory,
  });

  if (isLoading)
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </div>
    );
  if (error) return <div>Error loading categories</div>;

  const { data: categories } = data;

  const handleSelectCategory = (category) => {
    if (selectedCategory?.id === category.id) return;
    dispatch(setSelectedCategory(category));
  };

  return (
    <div className="category-list">
      <div className="category-list__list">
        {categories?.map((category) => (
          <div
            onClick={() => handleSelectCategory(category)}
            className={classNames('category-list__list-item', {
              'category-list__list-item--selected': category.id === selectedCategory?.id,
            })}
            key={category.id}
          >
            <span className="category-list__list-item-text">{category.name}</span>
            {category.id === selectedCategory?.id && <i className="icon-check category-list__list-item-selcted-icon" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
