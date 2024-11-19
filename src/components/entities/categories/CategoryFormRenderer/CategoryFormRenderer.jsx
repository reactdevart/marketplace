import '@/components/entities/categories/CategoryFormRenderer/CategoryFormRenderer.scss';

import { useCallback, useMemo } from 'react';

import useFormValidator from '@/hooks/useFormValidator';
import useRenderField from '@/hooks/useRenderField';
import { extractFields, getInitialState } from '@/utils/formUtils';

const CategoryFormRenderer = ({ form }) => {
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
      if (validateForm()) {
        console.log('Form Submitted:', formState);
      } else {
        console.log('Validation Errors:', errors);
      }
    },
    [formState, errors, validateForm]
  );

  return (
    <form className="category-form-renderer" onSubmit={handleFormSubmit}>
      {renderSection}
    </form>
  );
};

export default CategoryFormRenderer;
