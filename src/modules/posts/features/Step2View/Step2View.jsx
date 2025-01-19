import './Step2View.scss';

import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OverlayPending from '@/components/shared/OverlayPending';
import { useCreatePostMutation } from '@/store/categories/categoriesApi';
import {
  getSelectedCategory,
  getSelectedGeneralCategory,
  getSelectedSubcategory,
  getSelectedSubcategoryOptions,
} from '@/store/categories/categoriesSlice';
import { addToast } from '@/store/toaster/toasterSlice';
import { buildFormData } from '@/utils/categoryUtil';
import { deleteDatabase, getImages, mergeImagesWithExistingState } from '@/utils/imageUtil';

import PreviewPostInformation from '../PreviewPostInformation';

const Step2View = ({ onPrev }) => {
  const [form, setForm] = useState(null);

  const dispatch = useDispatch();
  const [createPost, { isLoading: isCreatePostPending }] = useCreatePostMutation();
  const selectedGeneralCategory = useSelector(getSelectedGeneralCategory);
  const selectedCategory = useSelector(getSelectedCategory);
  const selectedSubcategory = useSelector(getSelectedSubcategory);
  const selectedSubcategoryOptions = useSelector(getSelectedSubcategoryOptions);

  useEffect(() => {
    const formState = JSON.parse(localStorage.getItem('formState'));
    getImages().then((images) => {
      if (images.length) {
        const mergedForm = mergeImagesWithExistingState(formState, images);

        setForm(mergedForm);
      }
    });
  }, []);

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const result = buildFormData({
        formState: form,
        selectedGeneralCategory,
        selectedCategory,
        selectedSubcategory,
        selectedSubcategoryOptions,
      });

      try {
        await createPost(result)
          .unwrap()
          .then(() => {
            deleteDatabase();
            localStorage.removeItem('formState');
            dispatch(addToast({ message: 'Post created successfully!', type: 'success' }));
          });
      } catch (err) {
        if (err?.data?.message) {
          dispatch(addToast({ message: err.data.message, type: 'error' }));
        }
      }
    },
    [
      createPost,
      dispatch,
      form,
      selectedGeneralCategory,
      selectedCategory,
      selectedSubcategory,
      selectedSubcategoryOptions,
    ]
  );
  return (
    <OverlayPending pending={isCreatePostPending} spinnerSize={110}>
      <div className="step-2-view__preview-post-information-wrapper">
        <PreviewPostInformation formState={form} />
        <div>
          <button onClick={onPrev}>Prev</button>
          <button disabled={isCreatePostPending} onClick={handleFormSubmit}>
            Create Post
          </button>
        </div>
      </div>
    </OverlayPending>
  );
};

export default memo(Step2View);
