import '@/components/entities/categories/CategoryFormRenderer/CategoryFormRenderer.scss';

import { useCallback, useMemo } from 'react';

import useFormValidator from '@/hooks/useFormValidator';
import useRenderField from '@/hooks/useRenderField';
import { extractFields, getInitialState } from '@/utils/formUtils';
import Button from '@/components/shared/Button';
import axios from 'axios';
import Input from '@/components/shared/Input';

const CategoryFormRenderer = ({ form, selectedGeneralCategory, selectedCategory }) => {
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
    (e) => {
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

      axios({
        method: 'post',
        url: 'https://dev-api.sell-ect.com/api/posts',
        data: form,
        headers: {
          Authorization:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjFjZjQ2ODc5NDQ5NDhjNTBjN2EzNDU2MzczMTFiNWRjNWYwMDIwOTI2YWQ0ZDhhMThlYzkyOTc3MDhjZmRmNjQ4ZDc2OWMzOTQzNDA0MTQiLCJpYXQiOjE3MzMyMzM1NjguMzIzNzg3LCJuYmYiOjE3MzMyMzM1NjguMzIzNzg5LCJleHAiOjE3NjQ3Njk1NjguMzE3NzAzLCJzdWIiOiI4OSIsInNjb3BlcyI6WyIqIl19.NJoyjETxEr1GsGiXScvKlMSLZMa7EzlNB2NUjdc17oW1lkvZnUBGDNUZJWrNMfKJUjYWpE8HihGPxu_SoROiDz6sny_pd301w6FJb2ffVAfAZQ1f_r5kqwEFwv2sbxmTPmRed1I_4jGOGLfSYZoh6nAaRgDs61CRHmSP4tlHwX17Pw2MvM07qa4ryw-3j9sA_XnxDxC7rvXW1zq0SVuQOJk6znsRvWcpVjIulE7HOHjajeEyQPKIKKHFgvFuZ2qBOPLRh3YYRry3yqpfZnbV95tvkFAH10EK3_-EfXB0A5Ect869OXfDhw3h45g1B6YqPRkt6cZU2w0m4GcLb6JO8nLwcB0GMck2RBuTKDErGjIBtEFCtZYHFDNsNndrNzLEO109k1vL3QqYBMdxdBvm3Man9th3krnKzTp_jwVF4edWG_cC_ROJxDyD9C6mE70ZB4X78jrg2mxDYHC643JEI8H-kw9sXm47KX16GgFHXwdA6aTo7xeCxOGfGwOvPCr9B9islWZJ7796upuetrhve5HhzjGeqcKO3NbLtayqZROtwkIjvBwzdvTAZmKcmQs4LrTb0JaXpg0JHVjcy3Dm3QMUho1n2lIGuu5v1B-jZwqR9SIauxaj0yY6cwQyIT8l_VcSiEV92rSdvBH7w1AE7DilJ6GgZk0XW_2SYj7lbIo',

          Accept: 'application/json',
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    [formState]
  );

  return (
    <form className="category-form-renderer" onSubmit={handleFormSubmit}>
      <div className="category-form-renderer__render-section-wrapper">
        {renderSection}
        <div className="category-form-renderer__section-renderer">
          <span className="category-form-renderer__section-label">Contact Information</span>
          <div className="category-form-renderer__fields" style="grid-template-columns: repeat(1, 1fr);">
            <Input
              style={{ height: 54 }}
              label="Phone Number"
              value={value}
              error={errors[fieldName]}
              name={fieldName}
              type={type === 'number' ? 'number' : 'text'}
              onChange={handleChange}
              animatedPlaceholder
            />
          </div>
        </div>
      </div>
      <div className="category-form-renderer__button-wrapper">
        <Button type="submit" variant="gradient">
          Create Post
        </Button>
      </div>
    </form>
  );
};

export default CategoryFormRenderer;
