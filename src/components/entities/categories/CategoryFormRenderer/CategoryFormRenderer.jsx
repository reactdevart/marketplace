import '@/components/entities/categories/CategoryFormRenderer/CategoryFormRenderer.scss';

import { useCallback, useMemo } from 'react';

import Button from '@/components/shared/Button';
import useFormValidator from '@/hooks/useFormValidator';
import useRenderField from '@/hooks/useRenderField';
import { useCreatePostMutation } from '@/store/categories/categoriesApi';
import { extractFields, getInitialState } from '@/utils/formUtils';

const CategoryFormRenderer = ({ form, selectedGeneralCategory, selectedCategory }) => {
  const [createPost] = useCreatePostMutation();
  const collectionOfFields = useMemo(() => extractFields(form), [form]);

  const initialState = useMemo(() => getInitialState(collectionOfFields), [collectionOfFields]);

  const { formState, errors, handleChange, validateForm } = useFormValidator(initialState);
  const renderField = useRenderField({ formState, errors, handleChange });

  const renderSection = useMemo(
    () =>
      Object.values(form).map(({ label, fields, direction }, index) => (
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
    [form, renderField]
  );

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const form = new FormData();
      form.append('general_category_id', selectedGeneralCategory.id);
      form.append('category_id', selectedCategory.id);
      form.append('subcategory_id', formState.subcategory.value.id);
      form.append('location_id', '1');
      form.append('options', [formState.condition.value.id]);
      form.append('title', formState.postTitle.value);
      form.append('price', formState.price.value);
      form.append('settings', { phone: formState.phoneNumber.value });
      form.append('description', formState.description.value);
      form.append('images', formState.pictures.value);

      try {
        await createPost(form).unwrap();
        alert('Post created successfully!');
      } catch (err) {
        console.error('Failed to create post:', err);
      }
    },
    [formState]
  );

  return (
    <form className="category-form-renderer" onSubmit={handleFormSubmit}>
      <div className="category-form-renderer__render-section-wrapper">{renderSection}</div>
      <div className="category-form-renderer__button-wrapper">
        <Button type="submit" variant="gradient">
          Create Post
        </Button>
      </div>
    </form>
  );
};

export default CategoryFormRenderer;
