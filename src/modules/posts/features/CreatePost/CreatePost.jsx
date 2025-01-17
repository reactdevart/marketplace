import '@/modules/posts/features/CreatePost/CreatePost.scss';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GeneralCategoryList from '@/components/entities/categories/GeneralCategoryList';
import Button from '@/components/shared/Button';
import OverlayPending from '@/components/shared/OverlayPending';
import { POST_TYPES } from '@/constants/create-post';
import useFormValidator from '@/hooks/useFormValidator';
import useRenderField from '@/hooks/useRenderField';
import {
  useCreatePostMutation,
  useGetCategoriesForGeneralCategoryIdQuery,
  useGetGeneralCategoriesQuery,
  useGetSubcategoriesForCategoryIdQuery,
} from '@/store/categories/categoriesApi';
import {
  getSelectedCategory,
  getSelectedGeneralCategory,
  setSelectedCategory,
} from '@/store/categories/categoriesSlice';
import { addToast } from '@/store/toaster/toasterSlice';
import { extractFields, getInitialState } from '@/utils/formUtils';

import PreviewPostInformation from './views/PreviewPostInformation';

const CreatePost = () => {
  const [step, setStep] = useState(2);
  const dispatch = useDispatch();
  const [createPost, { isLoading: isCreatePostPending }] = useCreatePostMutation();

  const selectedGeneralCategory = useSelector(getSelectedGeneralCategory);
  const selectedCategory = useSelector(getSelectedCategory);

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
      if (formState?.location?.value) {
        form.append('location_id', formState.location.value);
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
      if (formState?.phoneNumber?.value) {
        form.append('settings[phone]', formState.phoneNumber.value);
      }
      if (formState?.description?.value) {
        form.append('description', formState.description.value);
      }
      if (formState?.pictures?.value) {
        formState.pictures.value.forEach((picture, index) => {
          form.append(`images[${index + 1}]`, picture);
        });
      }

      try {
        await createPost(form)
          .unwrap()
          .then(() => {
            setStep(2);
            dispatch(addToast({ message: 'Post created successfully!', type: 'success' }));
          });
      } catch (err) {
        if (err?.data?.message) {
          dispatch(addToast({ message: err.data.message, type: 'error' }));
        }
      }
    },
    [formState, selectedCategory?.id, selectedGeneralCategory?.id, createPost, dispatch]
  );

  const renderSection = useMemo(
    () =>
      ctaegoryForm &&
      selectedCategory && (
        <form className="create-post__form-renderer" onSubmit={handleFormSubmit}>
          <div className="create-post__form-renderer-section-wrapper">
            {Object.values(ctaegoryForm).map(({ label, fields, direction }, index) => (
              <div className="create-post__form-renderer-section" key={index}>
                <span className="create-post__form-renderer-section-label">{label}</span>
                <div
                  style={{
                    gridTemplateColumns: `repeat(${direction === 'row' ? '2' : '1'}, 1fr)`,
                  }}
                  className="create-post__form-renderer-fields"
                >
                  {fields.map((field) => renderField(field))}
                </div>
              </div>
            ))}
          </div>
          <div className="create-post__button-wrapper">
            <Button pending={isCreatePostPending} type="submit" variant="gradient">
              Create Post
            </Button>
          </div>
        </form>
      ),
    [ctaegoryForm, selectedCategory, renderField, handleFormSubmit, isCreatePostPending]
  );

  const view = useMemo(() => {
    return {
      1: {
        title: 'Create a Post',
        component: (
          <div className="create-post__general-category-list-form-renderer-wrapper">
            <div className="create-post__general-category-list-wrapper">
              <GeneralCategoryList generalListData={generalListData} />
            </div>
            <OverlayPending spinnerSize={110} pending={isCreatePostPending}>
              <div className="create-post__form-renderer-wrapper">{renderSection}</div>
            </OverlayPending>
          </div>
        ),
      },
      2: {
        title: 'Preview',

        component: (
          <div className="create-post__preview-post-information-wrapper">
            <PreviewPostInformation formState={formState} />
          </div>
        ),
      },
    };
  }, [generalListData, isCreatePostPending, renderSection, formState]);

  return (
    <div className="create-post">
      <div className="create-post__title-steps-wrapper">
        <span className="create-post__title">{view[step].title}</span>
        <span className="create-post__steps">{`Step ${step}/2`}</span>
      </div>
      {view[step].component}
    </div>
  );
};

export default CreatePost;
