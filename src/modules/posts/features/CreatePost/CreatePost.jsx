import '@/modules/posts/features/CreatePost/CreatePost.scss';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { POST_TYPES } from '@/constants/create-post';
import useFormValidator from '@/hooks/useFormValidator';
import useRenderField from '@/hooks/useRenderField';
import view from '@/modules/posts/features/CreatePost/views/view';
import {
  useCreatePostMutation,
  useGetCategoriesForGeneralCategoryIdQuery,
  useGetGeneralCategoriesQuery,
  useGetSubcategoriesForCategoryIdQuery,
} from '@/store/categories/categoriesApi';
import { setSelectedCategory } from '@/store/categories/categoriesSlice';
import { extractFields, getInitialState } from '@/utils/formUtils';

const CreatePost = () => {
  const [step] = useState(1);
  const dispatch = useDispatch();
  const [createPost] = useCreatePostMutation();

  const selectedGeneralCategory = useSelector((state) => state.categories.selectedGeneralCategory);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);

  const generalListData = useGetGeneralCategoriesQuery(undefined, {
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

  const { data: categories, isSuccess: isCategoriesSuccess } = useGetCategoriesForGeneralCategoryIdQuery(
    selectedGeneralCategory?.id,
    {
      skip: !selectedGeneralCategory,
    }
  );

  useGetSubcategoriesForCategoryIdQuery(selectedCategory?.id, {
    skip: !selectedCategory,
  });

  const ctaegoryForm = POST_TYPES?.[selectedGeneralCategory?.name]?.subcategories?.[selectedCategory?.name];
  const collectionOfFields = useMemo(() => ctaegoryForm && extractFields(ctaegoryForm), [ctaegoryForm]);
  const initialState = useMemo(() => collectionOfFields && getInitialState(collectionOfFields), [collectionOfFields]);
  const { formState, errors, handleChange } = useFormValidator(initialState);
  const renderField = useRenderField({ formState, errors, handleChange });

  useEffect(() => {
    if (isCategoriesSuccess && categories?.data?.length === 1 && categories?.data[0]?.name === 'All') {
      dispatch(setSelectedCategory(categories?.data[0]));
    }
  }, [isCategoriesSuccess, categories, dispatch]);

  const Component = view[step].component;

  const renderSection = useMemo(
    () =>
      ctaegoryForm &&
      Object.values(ctaegoryForm).map(({ label, fields, direction }, index) => (
        <div className="category-form-renderer__section-renderer" key={index}>
          <span className="category-form-renderer__section-label">{label}</span>
          <div
            style={{
              gridTemplateColumns: `repeat(${direction === 'row' ? '2' : '1'}, 1fr)`,
            }}
            className="category-form-renderer__fields"
          >
            {fields.map((field) => renderField(field))}
          </div>
        </div>
      )),
    [ctaegoryForm, renderField]
  );

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const form = new FormData();
      if (selectedGeneralCategory?.id) {
        form.append('general_category_id', selectedGeneralCategory.id);
      }
      if (selectedCategory?.id) {
        form.append('category_id', selectedCategory.id);
      }
      if (formState?.subcategory?.value?.id) {
        form.append('subcategory_id', formState.subcategory.value.id);
      }
      if (formState?.location?.id) {
        form.append('location_id', formState.location.id);
      }
      if (formState?.condition?.value?.id) {
        form.append('options[1]', formState.condition.value.id);
      }
      if (formState?.postTitle?.value) {
        form.append('title', formState.postTitle.value);
      }
      if (formState?.price?.value) {
        form.append('price', formState.price.value);
      }
      form.append('settings[phone]', '(555) 555-1234');
      if (formState?.description?.value) {
        form.append('description', formState.description.value);
      }
      if (formState?.pictures?.value) {
        formState.pictures.value.forEach((picture, index) => {
          form.append(`images[${index + 1}]`, picture);
        });
      }

      try {
        await createPost(form).unwrap();
        alert('Post created successfully!');
      } catch (err) {
        console.error('Failed to create post:', err);
      }
    },
    [formState, selectedCategory.id, selectedGeneralCategory.id, createPost]
  );

  return (
    <div className="create-post">
      <div className="create-post__title-steps-wrapper">
        <span className="create-post__title">{view[step].title}</span>
        <span className="create-post__steps">{`Step ${step}/2`}</span>
      </div>
      <div className="create-post__step-wrapper">
        <Component
          renderSection={renderSection}
          handleFormSubmit={handleFormSubmit}
          generalListData={generalListData}
        />
      </div>
    </div>
  );
};

export default CreatePost;
